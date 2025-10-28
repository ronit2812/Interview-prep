const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const CodingQuestionModel = require("../models/CodingQuestionModel");

// Base directory for temporary code files
const TEMP_DIR = path.join(__dirname, "../temp");

// Debug flag - set to true to keep temp files for debugging
const DEBUG_MODE = true;

// Docker container IDs for different languages
const CONTAINERS = {
  cpp: "15753a97df1d5e411de996239496c5c28d5314382a13ccfd50bc4259b278381d",
  java: "237d131b381ce2bfa8ec0d6f477172efc7f7ab08a170baa8fa2f4a5411cabd9b",
  python: "61aba4582ecb6ecb5d2d4ec46319b002ba574c440c4b95ec975e34b4f0e4f4d4",
  javascript:
    "001a3b3ee08d63c84f7fdd7b5ff8a2c954395d5ff77b4e42dce337baa3209359",
};

// Ensure temp directory and language subdirectories exist
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Create language-specific directories if they don't exist
Object.keys(CONTAINERS).forEach((lang) => {
  const langDir = path.join(TEMP_DIR, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
    console.log(`Created directory for ${lang}: ${langDir}`);
  }
});

/**
 * Execute code using Docker containers
 * @route POST /api/execute
 * @access Public
 */
const executeCode = async (req, res) => {
  try {
    const { code, language, questionId } = req.body;

    if (!code || !language || !questionId) {
      return res.status(400).json({
        success: false,
        message: "Code, language, and question ID are required",
      });
    } // Fetch test cases from database
    const question = await CodingQuestionModel.findById(questionId);
    console.log(`Fetched question: ${questionId}`, question);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Get test cases from the question
    const testCases = question.testCases;
    if (!testCases || testCases.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No test cases found for this question",
      });
    }

    // Get the appropriate language key (lowercase)
    const langKey = language.toLowerCase();

    // Check if we support this language
    if (!CONTAINERS[langKey]) {
      return res.status(400).json({
        success: false,
        message: `Language ${language} is not supported. Supported languages: ${Object.keys(
          CONTAINERS
        ).join(", ")}`,
      });
    }

    // Check if container exists and is running
    if (CONTAINERS[langKey]) {
      console.log(`Ensuring ${langKey} container is running...`);
      const containerStatus = await checkContainerStatus(CONTAINERS[langKey]);

      if (containerStatus === "not_found") {
        return res.status(500).json({
          success: false,
          message: `Docker container for ${language} not found. Please check your container ID.`,
        });
      } else if (containerStatus === "exited") {
        // Container exists but is stopped, start it
        console.log(`Starting stopped container ${CONTAINERS[langKey]}...`);
        await executeCommand(`docker start ${CONTAINERS[langKey]}`);
      } else if (containerStatus === "running") {
        console.log(`Container ${CONTAINERS[langKey]} is already running.`);
      }

      // We'll create directories as part of the execution command
      console.log(`Will create directory /app/${langKey} during execution`);
    }

    // Generate unique file names in language-specific directory
    const fileId = uuidv4();
    const langDir = path.join(TEMP_DIR, langKey);
    const codeFilePath = path.join(
      langDir,
      `${fileId}.${getFileExtension(langKey)}`
    );
    const inputFilePath = path.join(langDir, `${fileId}_input.txt`);
    const outputFilePath = path.join(langDir, `${fileId}_output.txt`);

    // Write code to file
    fs.writeFileSync(codeFilePath, code); // Process test cases
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(`Processing test case ${i + 1}...`);

      try {
        // Write input to file
        fs.writeFileSync(inputFilePath, testCase.input);

        // Run Docker container based on language
        const dockerCommand = getDockerCommand(
          language,
          fileId,
          codeFilePath,
          inputFilePath,
          outputFilePath
        );

        console.log(`Executing code for test case ${i + 1}...`);
        await executeDocker(dockerCommand); // Check if output file exists and read it
        let output = "";
        if (fs.existsSync(outputFilePath)) {
          output = fs.readFileSync(outputFilePath, "utf8");
          console.log(`Raw docker output for test ${i + 1}:`, output);
        } else {
          console.warn(`Output file not found for test case ${i + 1}`);
        }

        // Get expected output directly from database test case
        const expectedOutput = testCase.expectedOutput;

        // Clean up both outputs for comparison
        const cleanOutput = normalizeOutput(output);
        const cleanExpected = normalizeOutput(expectedOutput);

        // Detailed debug output
        console.log(`Test case ${i + 1} comparison:`, {
          testCase: i + 1,
          input: testCase.input,
          rawOutput: output,
          expectedOutput,
          cleanOutput,
          cleanExpected,
          inputType: testCase.inputType,
        });

        // Compare normalized versions for exact match
        let isPassed = cleanOutput === cleanExpected;

        results.push({
          id: testCase.id || i + 1,
          input: testCase.input,
          expected: expectedOutput,
          output: cleanOutput,
          status: isPassed ? "passed" : "failed",
          hidden: testCase.isHidden || false,
        });

        console.log(results[0]);

        console.log(`Test case ${i + 1} ${isPassed ? "passed" : "failed"}`);
      } catch (error) {
        console.error(`Error executing test case ${i + 1}:`, error);
        results.push({
          id: testCase.id || i + 1,
          input: testCase.input,
          expected: testCase.expectedOutput,
          output: `Execution error: ${error.message}`,
          status: "failed",
          hidden: testCase.isHidden || false,
        });
      }
    }

    // Clean up temp files
    cleanupFiles([codeFilePath, inputFilePath, outputFilePath]);

    // Calculate execution details
    const executionDetails = {
      runtime: `${Math.floor(Math.random() * 50) + 20} ms`, // Mock timing for now
      memory: `${(Math.random() * 10 + 5).toFixed(1)} MB`, // Mock memory usage
      status: results.every((r) => r.status === "passed")
        ? "Accepted"
        : "Wrong Answer",
      lastRun: "just now",
    };

    // In debug mode, save a debug log with results
    if (DEBUG_MODE) {
      const debugData = {
        code,
        language: langKey,
        testCases,
        results,
        executionDetails,
        timestamp: new Date().toISOString(),
      };

      const langDir = path.join(TEMP_DIR, langKey);
      const debugLogPath = path.join(langDir, `debug_${fileId}.json`);
      fs.writeFileSync(debugLogPath, JSON.stringify(debugData, null, 2));
      console.log(`Debug log saved to ${debugLogPath}`);
    }

    return res.status(200).json({
      success: true,
      results,
      executionDetails,
    });
  } catch (error) {
    console.error("Code execution error:", error);
    return res.status(500).json({
      success: false,
      message: "Error executing code",
      error: error.message,
    });
  }
};

/**
 * Helper function to execute docker command
 */
const executeDocker = (command) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing Docker command: ${command}`);

    exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Docker execution error: ${error.message}`);
        if (stderr) {
          console.error(`Docker stderr: ${stderr}`);
          // Include stderr in the error for better debugging
          error.stderr = stderr;
        }
        reject(error);
        return;
      }

      if (stderr && stderr.trim() !== "") {
        console.warn(`Docker stderr (not fatal): ${stderr}`);
      }

      if (stdout) {
        console.log(
          `Docker stdout: ${stdout.substring(0, 200)}${
            stdout.length > 200 ? "..." : ""
          }`
        );
      }

      resolve(stdout);
    });
  });
};

/**
 * Get file extension based on language
 */
const getFileExtension = (language) => {
  switch (language.toLowerCase()) {
    case "cpp":
      return "cpp";
    case "java":
      return "java";
    case "python":
      return "py";
    case "javascript":
      return "js";
    default:
      return "txt";
  }
};

/**
 * Get Docker command based on language
 */
const getDockerCommand = (
  language,
  fileId,
  codeFilePath,
  inputFilePath,
  outputFilePath
) => {
  const langKey = language.toLowerCase();
  const containerDir = `/app/${langKey}`;
  const containerId = CONTAINERS[langKey];

  // Get basenames for files
  const codeFileName = path.basename(codeFilePath);
  const inputFileName = path.basename(inputFilePath);
  const outputFileName = path.basename(outputFilePath);

  // First ensure the directory exists
  const createDirCommand = `docker exec ${containerId} mkdir -p ${containerDir}`;

  switch (langKey) {
    case "cpp":
      // Copy files into container, compile and run in language directory
      return (
        `${createDirCommand} && ` +
        `docker cp ${codeFilePath} ${containerId}:${containerDir}/${codeFileName} && ` +
        `docker cp ${inputFilePath} ${containerId}:${containerDir}/${inputFileName} && ` +
        `docker exec ${containerId} bash -c "cd ${containerDir} && g++ -std=c++17 -o ${fileId} ${codeFileName} && ` +
        `./${fileId} < ${inputFileName} > ${outputFileName} 2>&1" && ` +
        `docker cp ${containerId}:${containerDir}/${outputFileName} ${outputFilePath}`
      );

    case "python":
      // For Python, try python3 first, fall back to python if needed
      return (
        `${createDirCommand} && ` +
        `docker cp ${codeFilePath} ${containerId}:${containerDir}/${codeFileName} && ` +
        `docker cp ${inputFilePath} ${containerId}:${containerDir}/${inputFileName} && ` +
        `docker exec ${containerId} bash -c "cd ${containerDir} && ` +
        `(command -v python3 >/dev/null 2>&1 && python3 ${codeFileName} || python ${codeFileName}) ` +
        `< ${inputFileName} > ${outputFileName} 2>&1" && ` +
        `docker cp ${containerId}:${containerDir}/${outputFileName} ${outputFilePath}`
      );

    case "java":
      // For Java, we need to handle the public class name issue
      // We'll create a temporary file with the right name dynamically
      return (
        `${createDirCommand} && ` +
        `docker cp ${codeFilePath} ${containerId}:${containerDir}/${codeFileName} && ` +
        `docker cp ${inputFilePath} ${containerId}:${containerDir}/${inputFileName} && ` +
        `docker exec ${containerId} bash -c "cd ${containerDir} && ` +
        // Extract the public class name or use Solution as fallback
        `CLASS_NAME=\\$(grep -o 'public\\s\\+class\\s\\+\\w\\+' ${codeFileName} | awk '{print \\$3}' || echo 'Solution') && ` +
        // If found a class name, create a copy with proper name
        `if [ -n \\"\${CLASS_NAME}\\" ]; then ` +
        `   echo \\"Detected public class: \${CLASS_NAME}\\" && ` +
        `   cp ${codeFileName} \${CLASS_NAME}.java && ` +
        `   javac \${CLASS_NAME}.java && ` +
        `   java \${CLASS_NAME} < ${inputFileName} > ${outputFileName} 2>&1; ` +
        `else ` +
        `   javac ${codeFileName} && ` +
        `   CLASS_FILE=\\$(ls *.class | head -1 | sed 's/\\.class//') && ` +
        `   java \${CLASS_FILE} < ${inputFileName} > ${outputFileName} 2>&1; ` +
        `fi" && ` +
        `docker cp ${containerId}:${containerDir}/${outputFileName} ${outputFilePath}`
      );

    case "javascript":
      // For JavaScript, ensure node is available and handle path issues
      return (
        `${createDirCommand} && ` +
        `docker cp ${codeFilePath} ${containerId}:${containerDir}/${codeFileName} && ` +
        `docker cp ${inputFilePath} ${containerId}:${containerDir}/${inputFileName} && ` +
        `docker exec ${containerId} bash -c "cd ${containerDir} && ` +
        // Check if node is installed, otherwise look for nodejs
        `(command -v node >/dev/null 2>&1 && NODE_CMD=node || NODE_CMD=nodejs) && ` +
        `if ! command -v \${NODE_CMD} >/dev/null 2>&1; then ` +
        `   echo 'Error: Neither node nor nodejs command is available' >&2 && exit 1; ` +
        `fi && ` +
        `echo 'Using node command: '\${NODE_CMD} && ` +
        `\${NODE_CMD} ${codeFileName} < ${inputFileName} > ${outputFileName} 2>&1 || ` +
        `(echo 'JavaScript execution failed' >&2 && exit 1)" && ` +
        `docker cp ${containerId}:${containerDir}/${outputFileName} ${outputFilePath} || ` +
        `echo 'Output file could not be copied, execution may have failed'`
      );

    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

/**
 * Clean up temp files
 */
const cleanupFiles = (filePaths) => {
  // In debug mode, don't delete files
  if (DEBUG_MODE) {
    console.log("Debug mode enabled, keeping temporary files for inspection");
    console.log("Files available at:", filePaths);
    return;
  }

  filePaths.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
      }
    }
  });
};

/**
 * Check container status (running, exited, or not_found)
 */
const checkContainerStatus = async (containerId) => {
  try {
    // First check if container exists at all
    const existsCommand = `docker ps -a --filter "id=${containerId}" --format "{{.Status}}"`;
    const existsResult = await executeCommand(existsCommand);

    if (!existsResult.trim()) {
      return "not_found";
    }

    // Check if it's running
    const isRunningCommand = `docker ps --filter "id=${containerId}" --format "{{.ID}}"`;
    const isRunningResult = await executeCommand(isRunningCommand);

    return isRunningResult.trim() ? "running" : "exited";
  } catch (error) {
    console.error(`Error checking container ${containerId} status:`, error);
    return "error";
  }
};

/**
 * Execute a shell command
 */
const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command execution error: ${error.message}`);
        console.error(`stderr: ${stderr}`);
        reject(error);
        return;
      }

      if (stderr) {
        console.warn(`Command stderr: ${stderr}`);
      }

      resolve(stdout);
    });
  });
};

const normalizeOutput = (str) => {
  if (!str) return "";

  return (
    String(str)
      // Standardize line endings and whitespace
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      // Trim each line and filter out empty lines
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n")
      // Trim the final result
      .trim()
  );
};

module.exports = {
  executeCode,
};
