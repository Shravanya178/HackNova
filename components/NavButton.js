import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ icon, label, isActive, onClick }) => (
  <button
    className={`flex flex-col items-center p-2 rounded-md ${
      isActive ? "text-blue-600" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export default NavButton;