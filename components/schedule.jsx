import React, { useState } from "react";

const Schedule = () => {
  const [medications, setMedications] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState(false);

  const addMedication = (e) => {
    e.preventDefault();
    const newMedication = {
      name: medicineName,
      dosage,
      frequency,
      time,
      reminders,
    };
    setMedications([...medications, newMedication]);
    resetForm();
  };

  const resetForm = () => {
    setMedicineName("");
    setDosage("");
    setFrequency("");
    setTime("");
    setReminders(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-600">
        💊 Medication Management
      </h1>
      <form
        onSubmit={addMedication}
        className="mt-4 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          placeholder="Medicine Name"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <input
          type="text"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="Dosage (mg/ml)"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          required
        >
          <option value="">Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="As Needed">As Needed</option>
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          required
        />
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={reminders}
            onChange={() => setReminders(!reminders)}
            className="mr-2"
          />
          Enable Reminders
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-4">Scheduled Medications</h2>
      <ul className="mt-2">
        {medications.map((med, index) => (
          <li key={index} className="border-b py-2">
            {med.name} - {med.dosage} ({med.frequency}) at {med.time}
            {med.reminders && (
              <span className="text-green-500"> - Reminder Enabled</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
