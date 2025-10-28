import { useEffect, useState } from "react";
import authentication_logo from "../../assets/images/authenticated.svg";
import DataTable from "react-data-table-component";
import { autheticateAdminUserById, getAdminUsers } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

export default function AdminUsers() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [record, setRecord] = useState(adminUsers);
  const columns = [
    {
      name: "Sr.No",
      selector: (row) => row.srNo,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Authentication",
      selector: (row) =>
        row.isAuthenticate ? (
          <p className="flex flex-row items-center">
            <img
              src={authentication_logo}
              alt="authenticated"
              className="w-5 h-5 mr-1"
            />
            Authenticated
          </p>
        ) : (
          <button
            className="w-32 h-8 bg-[#5652B7] rounded-md text-white hover:bg-[#6461BD] shadow-md"
            onClick={() => handleAuthenticate(row._id)}
          >
            Authenticate
          </button>
        ),
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminUsers();
        const data = await response.data;
        if (response?.success && response?.data) {
          const dataWithSerialNumber = data.map((user, index) => ({
            ...user,
            srNo: index + 1,
          }));
          setAdminUsers(dataWithSerialNumber);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setRecord(adminUsers);
  }, [adminUsers]);

  const handleAuthenticate = async (userId) => {
    try {
      const response = await autheticateAdminUserById(userId);
      if (response.success) {
        toast.success("User Authenticated!", {
          position: "top-right",
          autoClose: true,
        });
        setAdminUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...response.data, srNo: user.srNo } : user
          )
        );
      }
    } catch (error) {
      toast.error("Failed to authenticate user", {
        position: "top-right",
        autoClose: true,
      });
      console.error("Authentication Error: ", error);
    }
  };

  const handleFilter = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = adminUsers.filter((row) => {
      return (
        row.username.toLowerCase().includes(searchText) ||
        row.email.toLowerCase().includes(searchText) ||
        (row.authentication && "authenticated".includes(searchText)) ||
        (!row.authentication && "not authenticated".includes(searchText))
      );
    });
    setRecord(filteredData);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-row justify-between items-center my-2">
        <p className="text-xl font-medium ml-4">Admin Users</p>
        <p>
          <label htmlFor="search" className="text-lg mr-2">
            Search:
          </label>
          <input
            type="text"
            name="search"
            className="w-56 h-10 px-2 py-2 ring-2 text-base ring-gray-400 ring-inset focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-md"
            onChange={handleFilter}
          />
        </p>
      </div>
      <DataTable
        columns={columns}
        data={record}
        customStyles={customStyles}
        pagination
        responsive
        highlightOnHover
        pointerOnHover
        noDataComponent={
          <p className="text-lg text-gray-500">No data available</p>
        }
      />
    </>
  );
}
