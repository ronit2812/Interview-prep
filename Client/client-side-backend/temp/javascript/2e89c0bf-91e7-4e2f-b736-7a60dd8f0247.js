process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
    const num = parseInt(data.trim());

    if (isNaN(num)) {
        console.log("Invalid input");
    } else if (num % 2 === 0) {
        console.log("Even");
    } else {
        console.log("Odd");
    }

    process.stdin.pause(); // Stop the program after one input
});
