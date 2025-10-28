import { Link, Outlet } from "react-router";
import { useLocation } from "react-router";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { getAllCodingQuestions } from "../../services/CodingDependency";

export default function Assignments() {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllCodingQuestions();
        if (response && response.data) {
          const mappedData = response.data.map((question, index) => ({
            srNo: index + 1,
            title: question.title,
            description: question.description,
            isPremium: question.isPremium ? "Yes" : "No",
            difficultyLevel: question.difficultyLevel,
          }));
          setQuestions(mappedData);
          setFilteredQuestions(mappedData);
        }
      } catch (error) {
        console.error("Error fetching coding questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = questions.filter(
      (item) =>
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
    );

    setFilteredQuestions(filtered);
  };

  const columns = [
    {
      name: "Sr.No",
      selector: (row) => row.srNo,
      sortable: true,
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "400px",
    },
    {
      name: "Premium",
      selector: (row) => row.isPremium,
      sortable: true,
    },
    {
      name: "Difficulty Level",
      selector: (row) => row.difficultyLevel,
      sortable: true,
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
      {location.pathname === "/coding-questions" && (
        <div>
          <div className="flex justify-between items-center mt-3">
            <div className="font-medium text-xl">
              <p>Coding Questions For Practice</p>
            </div>
            <div className="flex items-center gap-x-6">
              <div>
                <label htmlFor="search" className="text-lg mr-2">
                  Search:
                </label>
                <input
                  type="text"
                  name="search"
                  value={searchText}
                  className="w-56 h-10 px-2 py-2 ring-2 text-base ring-gray-400 ring-inset focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-md"
                  onChange={handleFilter}
                />
              </div>
              <Link to="modify-coding-question">
                <button className="w-40 h-10 bg-[#5652B7] rounded-md text-white hover:bg-[#6461BD] shadow-md">
                  Add Question
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredQuestions}
              customStyles={customStyles}
              pagination
              responsive
              highlightOnHover
              pointerOnHover
              progressPending={loading}
              progressComponent={<div className="text-lg py-4">Loading...</div>}
              noDataComponent={
                <p className="text-lg text-gray-500">No data available</p>
              }
            />
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
