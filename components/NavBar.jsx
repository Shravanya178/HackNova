import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ links }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-between items-center border-2 border-black rounded-lg p-2 m-2 overflow-x-auto">
      {links.map((link) => (
        <button
          key={link.path}
          className={`font-bold whitespace-nowrap px-2 md:px-4 ${
            location.pathname === link.path ? "text-blue-600" : ""
          }`}
          onClick={() => navigate(link.path)}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
};

export default NavBar;
