import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Edit, Trash2, MoreHorizontal, Settings, User } from "lucide-react";

const SchedulePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Manage medications state internally if props aren't provided
  const [medications, setMedications] = useState([
    { 
      id: 1, 
      name: "Lisinopril", 
      dosage: "10mg", 
      frequency: "Daily", 
      time: "Morning, 8:00 AM", 
      enableReminders: true, 
      stock: 15 
    },
    { 
      id: 2, 
      name: "Metformin", 
      dosage: "500mg", 
      frequency: "Twice Daily", 
      time: "8:00 AM, 8:00 PM", 
      enableReminders: true, 
      stock: 30 
    },
    { 
      id: 3, 
      name: "Atorvastatin", 
      dosage: "20mg", 
      frequency: "Daily", 
      time: "Night, 9:00 PM", 
      enableReminders: true, 
      stock: 3 
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "Daily",
    time: "",
    enableReminders: true,
    stock: 30,
  });

  // Toggle more menu
  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMed) {
      // Update existing medication
      setMedications(
        medications.map((med) =>
          med.id === editingMed ? { ...newMed, id: editingMed } : med
        )
      );
    } else {
      // Add new medication
      setMedications([...medications, { ...newMed, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingMed(null);
    setNewMed({
      name: "",
      dosage: "",
      frequency: "Daily",
      time: "",
      enableReminders: true,
      stock: 30,
    });
  };

  const handleEdit = (med) => {
    setEditingMed(med.id);
    setNewMed(med);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
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

      {/* Page Content */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-800">
            Medication Schedule
          </h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingMed(null);
              setNewMed({
                name: "",
                dosage: "",
                frequency: "Daily",
                time: "",
                enableReminders: true,
                stock: 30,
              });
            }}
            className="bg-blue-600 text-white p-2 rounded-full"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Medication Form */}
        {showForm && (
          <div className="bg-white p-4 rounded-lg shadow-md border border-blue-200 mt-4">
            <h3 className="text-lg font-medium text-blue-700 mb-4">
              {editingMed ? "Edit Medication" : "Add New Medication"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage (mg/ml)
                </label>
                <input
                  type="text"
                  value={newMed.dosage}
                  onChange={(e) =>
                    setNewMed({ ...newMed, dosage: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={newMed.frequency}
                  onChange={(e) =>
                    setNewMed({ ...newMed, frequency: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Daily</option>
                  <option>Twice Daily</option>
                  <option>Three Times Daily</option>
                  <option>Weekly</option>
                  <option>As Needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time(s) for Reminder
                </label>
                <input
                  type="text"
                  value={newMed.time}
                  onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="08:00,20:00 (for multiple times)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Stock (Pills/Units)
                </label>
                <input
                  type="number"
                  value={newMed.stock}
                  onChange={(e) =>
                    setNewMed({ ...newMed, stock: parseInt(e.target.value) })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableReminders"
                  checked={newMed.enableReminders}
                  onChange={(e) =>
                    setNewMed({ ...newMed, enableReminders: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="enableReminders"
                  className="ml-2 text-sm text-gray-700"
                >
                  Enable Reminders
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {editingMed ? "Update" : "Add"} Medication
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Medications List */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 mt-6">
          <h3 className="font-medium text-blue-700 mb-3">
            Scheduled Medications
          </h3>
          {medications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No medications scheduled
            </p>
          ) : (
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="border-b border-blue-100 pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {med.name} • {med.dosage}
                      </p>
                      <p className="text-sm text-gray-600">
                        {med.frequency} • {med.time}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stock: {med.stock} remaining
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(med)}
                        className="p-1 text-blue-600"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(med.id)}
                        className="p-1 text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Calendar View (Simplified) */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 mt-6">
          <h3 className="font-medium text-blue-700 mb-3">Calendar View</h3>
          <div className="text-center text-gray-500">
            Calendar visualization would appear here
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 p-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            className="p-3 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <span>Dashboard</span>
          </button>
          <button
            className="p-3 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/pharmacy")}
          >
            <span>Pharmacy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;