import { useLocation } from "react-router";
import user_account_logo from "../../assets/images/account_circle.png";
import { useEffect, useState } from "react";

export default function Navbar({ setIsAuthenticated }) {
  const location = useLocation();
  const [headerName, setHeaderName] = useState("");
  useEffect(() => {
    setHeaderName(location.pathname.split(/[/-]/)[1]);
  }, [location]);
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <>
      <div className="Navbar w-[77.4rem] bg-white h-16 py-2 px-5 top-0 left-72 fixed flex items-center justify-between drop-shadow-md">
        <div className="text-xl font-semibold">
          {headerName.charAt(0).toUpperCase() + headerName.slice(1)}
        </div>
        <div className="flex justify-center items-center">
          <img
            src={user_account_logo}
            alt="user_account_logo"
            width="36px"
            className="cursor-pointer ml-3"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
}
