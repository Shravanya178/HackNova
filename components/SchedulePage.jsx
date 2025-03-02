import React, { useState } from "react";

const medicationData = {
  "2025-03-01": [
    { name: "Aspirin", time: "08:00 AM", dosage: "100mg" },
    { name: "Vitamin D", time: "08:00 AM", dosage: "1000 IU" },
  ],
  "2025-03-02": [
    { name: "Aspirin", time: "08:00 AM", dosage: "100mg" },
    { name: "Omega-3", time: "12:00 PM", dosage: "1000mg" },
  ],
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState("2025-03-01");

  return (
    <div className="bg-gray-100 min-h-screen p-4">
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full px-4 py-6 overflow-auto bg-white rounded-lg shadow">
        {/* Schedule Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Schedule</h1>
          </div>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <button className="p-2 border rounded hover:bg-gray-100">
                ←
              </button>
              <h2 className="text-xl font-bold">March 2025</h2>
              <button className="p-2 border rounded hover:bg-gray-100">
                →
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-medium p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(31).keys()].map((num) => {
                const day = num + 1;
                const dateKey = `2025-03-${day.toString().padStart(2, "0")}`;
                return (
                  <div
                    key={day}
                    className={`p-3 border h-14 cursor-pointer relative ${
                      selectedDate === dateKey
                        ? "bg-blue-100 border-blue-500 border-2"
                        : ""
                    }`}
                    onClick={() => setSelectedDate(dateKey)}
                  >
                    <div>{day}</div>
                    {medicationData[dateKey] && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-1 right-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Medication List */}
          <div className="mt-4 p-4 border rounded">
            <h3 className="font-bold text-lg mb-2">
              Medications for {selectedDate}
            </h3>
            <ul>
              {medicationData[selectedDate] ? (
                medicationData[selectedDate].map((med, index) => (
                  <li key={index} className="p-2 bg-gray-100 rounded mb-2">
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-gray-600">
                      {med.time} - {med.dosage}
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-2 bg-gray-100 rounded">
                  No medications scheduled.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

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
          📜 Export to Sheets
        </button>
      </div>
    </div>
  );
};

export default App;
