import { Link, Outlet, useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash2 } from "lucide-react";
import {
  getAllAssignmentQuestions,
  deleteAssignmentQuestionById,
} from "../../services/AssignmentDependency";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Assignments() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getAllAssignmentQuestions();
        if (response.success) {
          // Transform the data to match the table structure
          const formattedData = response.data.map((item, index) => ({
            srNo: index + 1,
            id: item._id,
            question: item.questionText,
            subject: item.subCategory.name,
            topic: item.section.name,
            difficulty: item.difficulty,
            choice: item.choiceType === "single" ? "Single" : "Multiple",
          }));
          setQuestionData(formattedData);
        } else {
          console.error("Failed to fetch questions:", response.message);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname === "/assignments") {
      fetchQuestions();
    }
  }, [location.pathname]);

  const handleEdit = (id) => {
    navigate(`modify-assignments?id=${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await deleteAssignmentQuestionById(id);
        if (response.success) {
          toast.success("Question deleted successfully!");
          setTimeout(async () => {
            try {
              setLoading(true);
              const response = await getAllAssignmentQuestions();
              if (response.success) {
                const formattedData = response.data.map((item, index) => ({
                  srNo: index + 1,
                  id: item._id,
                  question: item.questionText,
                  subject: item.subCategory.name,
                  topic: item.section.name,
                  difficulty: item.difficulty,
                  choice: item.choiceType === "single" ? "Single" : "Multiple",
                }));
                setQuestionData(formattedData);
              }
            } catch (error) {
              console.error("Error refreshing questions:", error);
            } finally {
              setLoading(false);
            }
          }, 3000);
        } else {
          toast.error("Failed to delete question: " + response.message);
        }
      } catch (error) {
        console.error("Error deleting question:", error);
        toast.error("An error occurred while deleting the question");
      }
    }
  };

  const columns = [
    {
      name: "Sr.No",
      selector: (row) => row.srNo,
      sortable: true,
    },
    {
      name: "Question",
      selector: (row) => row.question,
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Topic",
      selector: (row) => row.topic,
      sortable: true,
    },
    {
      name: "Difficulty",
      selector: (row) => row.difficulty,
      sortable: true,
    },
    {
      name: "Choice",
      selector: (row) => row.choice,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleEdit(row.id)}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ),
      button: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        fontSize: "18px",
      },
    },
    headCells: {
      style: {
        fontSize: "17px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        fontSize: "16px",
      },
    },
  };

  return (
    <>
      {location.pathname === "/assignments" && (
        <div>
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="flex justify-between items-center mt-3">
            <div className="font-medium text-xl">
              <p>Topic wise Assignments</p>
            </div>
            <div className="flex items-center gap-x-6">
              <div>
                <label htmlFor="search" className="text-lg mr-2">
                  Search:
                </label>
                <input
                  type="text"
                  name="search"
                  className="w-56 h-10 px-2 py-2 ring-2 text-base ring-gray-400 ring-inset focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-md"
                  // onChange={handleFilter}
                />
              </div>
              <Link to="modify-assignments">
                <button className="w-40 h-10 bg-[#5652B7] rounded-md text-white hover:bg-[#6461BD] shadow-md">
                  Add Question
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={questionData}
              customStyles={customStyles}
              pagination
              responsive
              highlightOnHover
              pointerOnHover
              loading={loading}
              progressPending={loading}
              progressComponent={<div className="text-lg p-4">Loading...</div>}
              noDataComponent={
                <p className="text-lg text-gray-500">No questions available</p>
              }
            />
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
