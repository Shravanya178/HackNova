import React from "react";
import { useNavigate } from "react-router-dom";

import {
  BellRing,
  Clock,
  Check,
  AlertTriangle,
  MapPin,
  Lock,
} from "lucide-react";

const DashboardPage = ({
  medications = [], //
  lowStockMeds = [],
  markMedicationTaken = () => {},
  setActivePage = () => {},
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* User Greeting */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800">Hello, Natasha</h2>
        <p className="text-blue-600">How are you feeling today?</p>
      </div>

      {/* Next Appointment */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
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
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
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
              <button onClick={() => markMedicationTaken(med.id)}>
                <Check size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockMeds.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-100">
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
                <button className="text-xs bg-white text-blue-600 px-2 py-1 rounded-md border border-blue-200">
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Menu Options */}
      <div className="grid grid-cols-2 gap-3">
        <button
          className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 flex items-center justify-center"
          onClick={() => navigate("/pharmacy")}
        >
          <MapPin size={18} className="mr-2 text-blue-600" />
          <span>Pharmacy</span>
        </button>
        <button
          className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 flex items-center justify-center"
          onClick={() => navigate("/privacy")}
        >
          <Lock size={18} className="mr-2 text-blue-600" />
          <span>Privacy</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
