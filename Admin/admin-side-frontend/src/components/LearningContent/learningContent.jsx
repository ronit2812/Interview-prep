import { Link, Outlet, useLocation } from "react-router";
import DataTable from "react-data-table-component";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllLearningContent,
  deleteLearningContent,
} from "../../services/LearningDependency";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LearningContent() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLearningContent();
  }, [location.pathname]);

  const fetchLearningContent = async () => {
    try {
      const response = await getAllLearningContent();
      if (response.success) {
        const formattedData = response.data.map((item, index) => ({
          srNo: index + 1,
          category: item.categoryName,
          subCategory: item.subCategoryName,
          section: item.sectionName,
          subSection: item.subSectionName,
          description: item.content,
          action: (
            <div className="flex gap-2">
              <Link to={`modify-content?id=${item._id}`}>
                <Edit className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800" />
              </Link>
              <Trash2
                className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          ),
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching learning content:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        const response = await deleteLearningContent(id);
        if (response.success) {
          toast.success("Content deleted successfully!");
          setTimeout(() => {
            fetchLearningContent();
          }, 3000);
        } else {
          toast.error("Failed to delete content: " + response.message);
        }
      } catch (error) {
        console.error("Error deleting content:", error);
        toast.error("An error occurred while deleting content");
      }
    }
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = data.filter((item) => {
      return (
        item.category.toLowerCase().includes(searchValue) ||
        item.subCategory.toLowerCase().includes(searchValue) ||
        item.section.toLowerCase().includes(searchValue) ||
        item.subSection.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue)
      );
    });

    setFilteredData(filtered);
  };

  const columns = [
    {
      name: "Sr.No",
      selector: (row) => row.srNo,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Sub-Category",
      selector: (row) => row.subCategory,
      sortable: true,
    },
    {
      name: "Section",
      selector: (row) => row.section,
      sortable: true,
    },
    {
      name: "Sub-Section",
      selector: (row) => row.subSection,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: false,
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
      <ToastContainer position="top-right" autoClose={3000} />
      {location.pathname === "/learning" && (
        <div>
          <div className="flex justify-between items-center mt-3">
            <div className="font-medium text-xl">
              <p>Learning Content Material</p>
            </div>
            <div className="flex items-center gap-x-6">
              <div>
                <label htmlFor="search" className="text-lg mr-2">
                  Search:
                </label>
                <input
                  type="text"
                  name="search"
                  value={searchTerm}
                  onChange={handleFilter}
                  className="w-56 h-10 px-2 py-2 ring-2 text-base ring-gray-400 ring-inset focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-md"
                  placeholder="Search content..."
                />
              </div>
              <Link to="modify-content">
                <button className="w-32 h-10  bg-[#5652B7] rounded-md text-white hover:bg-[#6461BD] shadow-md cursor-pointer">
                  Add Content
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredData}
              customStyles={customStyles}
              pagination
              responsive
              highlightOnHover
              pointerOnHover
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
