
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  BellRing,
  Clock,
  Check,
  AlertTriangle,
  MapPin,
  Lock,
  MoreHorizontal,
  Settings,
  User
} from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Sample data (you can replace this with actual data fetching later)
  const medications = [
    { id: 1, name: "Lisinopril", dosage: "10mg", time: "Morning, 8:00 AM", stock: 15 },
    { id: 2, name: "Metformin", dosage: "500mg", time: "Evening, 7:00 PM", stock: 30 },
    { id: 3, name: "Atorvastatin", dosage: "20mg", time: "Night, 9:00 PM", stock: 3 }
  ];
  
  const lowStockMeds = medications.filter(med => med.stock < 5);
  
  const markMedicationTaken = (id) => {
    console.log(`Medication ${id} marked as taken`);
    // You can implement actual state updates here later
  };

  // Toggle more menu
  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  return (
    <div className="space-y-6 bg-blue-50 min-h-screen pb-24">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="flex items-center p-4">
          <div className="flex-1 flex space-x-6">
            <button 
              className={`${location.pathname === '/pharmacy' ? 'font-semibold text-blue-700' : 'text-gray-600'}`}
              onClick={() => navigate("/pharmacy")}
            >
              Pharmacy
            </button>
            <button 
              className={`${location.pathname === '/reminder' ? 'font-semibold text-blue-700' : 'text-gray-600'}`}
              onClick={() => navigate("/reminder")}
            >
              Reminder
            </button>
            <button 
              className={`${location.pathname === '/schedule' ? 'font-semibold text-blue-700' : 'text-gray-600'}`}
              onClick={() => navigate("/schedule")}
            >
              Schedule
            </button>
            <button 
              className={`${location.pathname === '/sos' ? 'font-semibold text-blue-700' : 'text-gray-600'}`}
              onClick={() => navigate("/sos")}
            >
              SOS
            </button>
          </div>
          <div className="relative">
            <button 
              onClick={toggleMoreMenu}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100"
            >
              <MoreHorizontal size={18} />
            </button>
            
            {/* More Menu Dropdown */}
            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/more");
                      setShowMoreMenu(false);
                    }}
                  >
                    More
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/settings");
                      setShowMoreMenu(false);
                    }}
                  >
                    <span className="flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </span>
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/profile");
                      setShowMoreMenu(false);
                    }}
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

      {/* Dashboard Content */}
      <div className="p-4">
        {/* User Greeting */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800">Hello, Natasha</h2>
          <p className="text-blue-600">How are you feeling today?</p>
        </div>

        {/* Next Appointment */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 mt-6">
          <div className="flex justify-between">
            <h3 className="font-medium text-blue-700">Next Appointment</h3>
            <Clock size={18} className="text-blue-600" />
          </div>
          <div className="mt-2">
            <p className="font-semibold">Dr. Patel</p>
            <p className="text-sm text-gray-600">March 10, 2025 • 10:30 AM</p>
          </div>
        </div>

        {/* Today's Medications */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 mt-6">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium text-blue-700">Today's Medications</h3>
            <BellRing size={18} className="text-blue-600" />
          </div>
          <div className="space-y-3">
            {medications.map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between border-b border-blue-50 pb-2"
              >
                <div>
                  <p className="font-medium">
                    {med.name} • {med.dosage}
                  </p>
                  <p className="text-xs text-gray-500">
                    {med.time.split(",")[0]}
                  </p>
                </div>
                <button 
                  onClick={() => markMedicationTaken(med.id)}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
                >
                  <Check size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        {lowStockMeds.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-100 mt-6">
            <div className="flex justify-between mb-3">
              <h3 className="font-medium text-red-700">Low Stock Alert</h3>
              <AlertTriangle size={18} className="text-red-600" />
            </div>
            <div className="space-y-2">
              {lowStockMeds.map((med) => (
                <div key={med.id} className="flex items-center justify-between">
                  <p>
                    {med.name} • Only {med.stock} left
                  </p>
                  <button className="text-xs bg-white text-blue-600 px-2 py-1 rounded-md border border-blue-200 hover:bg-blue-50">
                    Reorder
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 p-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-blue-100 p-3 rounded-lg flex items-center justify-center text-blue-700"
          >
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            className="p-3 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/pharmacy")}
          >
            <MapPin size={18} className="mr-2 text-blue-600" />
            <span>Pharmacy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;