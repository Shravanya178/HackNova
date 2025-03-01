import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const SchedulePage = ({ medications, setMedications }) => {
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
    <div className="space-y-6">
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
        <div className="bg-white p-4 rounded-lg shadow-md border border-blue-200">
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
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
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
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <h3 className="font-medium text-blue-700 mb-3">Calendar View</h3>
        <div className="text-center text-gray-500">
          Calendar visualization would appear here
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
