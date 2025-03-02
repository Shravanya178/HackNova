import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import React Router
import {
  Phone,
  Navigation,
  Edit,
  MoreHorizontal,
  Settings,
  User,
} from "lucide-react";

const SOSPage = ({ contacts = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const toggleMoreMenu = () => setShowMoreMenu(!showMoreMenu);

  return (
    <div className="space-y-6 bg-blue-50 min-h-screen pb-24">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="flex items-center p-4">
          <div className="flex-1 flex space-x-6">
            {["pharmacy", "reminder", "schedule", "sos"].map((page) => (
              <button
                key={page}
                className={`${
                  location.pathname === `/${page}`
                    ? "font-semibold text-blue-700"
                    : "text-gray-600"
                }`}
                onClick={() => navigate(`/${page}`)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={toggleMoreMenu}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100"
            >
              <MoreHorizontal size={18} />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/more")}
                  >
                    More
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/settings")}
                  >
                    <span className="flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </span>
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/profile")}
                  >
                    <span className="flex items-center">
                      <User size={16} className="mr-2" />
                      Profile
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-blue-800">Emergency SOS</h2>

      {/* Big SOS Button */}
      <div className="flex justify-center">
        <button className="bg-red-600 text-white text-xl font-bold rounded-full w-32 h-32 flex items-center justify-center shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all">
          SOS
        </button>
      </div>

      <p className="text-center text-gray-600">
        Press the SOS button to alert your emergency contacts
      </p>

      {/* Emergency Contacts */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-blue-700">Emergency Contacts</h3>
          <button className="text-blue-600">
            <Edit size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex justify-between items-center border-b border-blue-50 pb-2"
              >
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
                <button className="bg-green-100 text-green-700 p-2 rounded-full">
                  <Phone size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No emergency contacts added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSPage;
