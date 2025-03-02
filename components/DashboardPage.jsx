import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MoreHorizontal,
  Settings,
  User,
  Plus,
  Clock,
  Pill,
} from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Sample medication data
  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      time: "Morning, 8:00 AM",
      stock: 15,
      dueToday: true,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      time: "Evening, 7:00 PM",
      stock: 30,
      dueToday: true,
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      time: "Night, 9:00 PM",
      stock: 3,
      dueToday: true,
    },
    {
      id: 4,
      name: "Aspirin",
      dosage: "81mg",
      time: "Morning, 8:00 AM",
      stock: 45,
      dueToday: false,
    },
  ];

  const todaysMeds = medications.filter((med) => med.dueToday);
  const lowStockMeds = medications.filter((med) => med.stock < 5);

  // Toggle more menu
  const toggleMoreMenu = () => {
    setShowMoreMenu((prev) => !prev);
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Top Navigation Bar - styled like the wireframe */}
      <div className="flex justify-between items-center border-2 border-black rounded-lg p-2 m-2 overflow-x-auto">
        <button
          className={`font-bold whitespace-nowrap px-2 md:px-4 ${
            location.pathname === "/pharmacy" ? "text-blue-600" : ""
          }`}
          onClick={() => navigate("/pharmacy")}
        >
          Pharmacy
        </button>
        <button
          className={`font-bold whitespace-nowrap px-2 md:px-4 ${
            location.pathname === "/profile" ? "text-blue-600" : ""
          }`}
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          className={`font-bold whitespace-nowrap px-2 md:px-4 ${
            location.pathname === "/settings" ? "text-blue-600" : ""
          }`}
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>
        <button
          className={`font-bold whitespace-nowrap px-2 md:px-4 ${
            location.pathname === "/help" ? "text-blue-600" : ""
          }`}
          onClick={() => navigate("/help")}
        >
          Help
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow px-4 pb-4">
        {/* Greeting */}
        <p className="text-lg font-bold my-4">Hello, How are you today?</p>

        {/* Today's Medications */}
        <div className="border-2 border-black rounded-lg p-4 mb-4">
          <h2 className="font-bold text-lg mb-3">Today's Medications</h2>
          {todaysMeds.length > 0 ? (
            <div className="space-y-3">
              {todaysMeds.map((med) => (
                <div
                  key={med.id}
                  className="flex items-center border-b border-gray-200 pb-3"
                >
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Pill className="text-blue-500" size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">
                      {med.name} {med.dosage}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-1" /> {med.time}
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      med.stock < 5 ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {med.stock} left
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No medications scheduled for today.</p>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="font-bold text-lg uppercase mb-2 md:mb-0">
            {lowStockMeds.length > 0 ? "STOCK LOW" : "Stock Levels OK"}
          </div>

          <div className="relative flex items-center w-full px-8">
            <button
              className="absolute left-1/2 transform -translate-x-1/2 border-2 border-black rounded-full w-12 h-12 flex items-center justify-center"
              onClick={() => navigate("/add-medication")}
            >
              <Plus size={24} />
            </button>

            <div className="flex-grow"></div>

            <button
              className="bg-red-600 text-white font-bold border-2 border-black rounded-full px-4 py-2"
              onClick={() => navigate("/sos")}
            >
              SOS
            </button>
          </div>
        </div>

        {/* Low Stock Medications List (if any) */}
        {lowStockMeds.length > 0 && (
          <div className="border-t-2 border-gray-200 pt-4 mb-4">
            <h3 className="font-bold mb-2">Low Stock Medications:</h3>
            <div className="space-y-2">
              {lowStockMeds.map((med) => (
                <div
                  key={med.id}
                  className="p-3 bg-red-50 border border-red-200 rounded-md"
                >
                  <div className="flex justify-between flex-wrap">
                    <div>
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-gray-600">
                        {med.dosage} - {med.time}
                      </p>
                    </div>
                    <div className="text-red-600 font-bold">
                      {med.stock} left
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation - Always at bottom */}
      <div className="flex justify-between px-4 pb-4 mt-auto">
        <button
          className={`border-2 border-black rounded-lg py-2 px-2 md:px-4 w-1/2 mr-2 font-bold ${
            location.pathname === "/" || location.pathname === "/dashboard"
              ? "bg-gray-200"
              : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`border-2 border-black rounded-lg py-2 px-2 md:px-4 w-1/2 ml-2 font-bold ${
            location.pathname === "/schedule" ? "bg-gray-200" : ""
          }`}
          onClick={() => navigate("/schedule")}
        >
          Schedule
        </button>
      </div>

      {/* More Menu (preserving original functionality) */}
      {showMoreMenu && (
        <div className="absolute right-4 mt-2 w-48 bg-white border-2 border-black rounded-md shadow-lg z-20">
          <div className="py-1">
            {[
              { path: "/more", label: "More" },
              {
                path: "/settings",
                label: "Settings",
                icon: <Settings size={16} className="mr-2" />,
              },
              {
                path: "/profile",
                label: "Profile",
                icon: <User size={16} className="mr-2" />,
              },
            ].map((item) => (
              <button
                key={item.path}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  navigate(item.path);
                  setShowMoreMenu(false);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
