import React, { useState } from "react";
import {
  MapPin,
  Phone,
  User,
  Calendar,
  Home,
  Activity,
  Heart,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LogsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // This would come from your API or state management in a real app
  const [profile, setProfile] = useState({
    name: "Rishabh Singh",
    age: 42,
    gender: "Male",
    bloodType: "O+",
    weight: 180,
    height: 175,
    allergies: "Penicillin, Peanuts",
    healthIssues: "Hypertension, Type 2 Diabetes",
    currentMedication:
      "Metformin 500mg (twice daily), Lisinopril 10mg (once daily)",
    doctorName: "Dr. Sarah John",
    doctorContact: "(123) 555-4321",
    caretaker: "Meera Singh",
    sosContact: "(123) 456-7890",
    nearestPharmacy: "City Pharmacy, 0.5 km away",
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
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

      {/* Profile Card */}
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* User Info Section */}
          <div className="p-6 flex flex-col md:flex-row items-start gap-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-300">
              <User size={40} className="text-blue-500" />
            </div>

            {/* Basic Info */}
            <div className="flex-grow space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-gray-300 rounded-md p-2">
                  <label className="block text-sm text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full focus:outline-none text-gray-800 font-medium"
                  />
                </div>

                <div className="border border-gray-300 rounded-md p-2">
                  <label className="block text-sm text-gray-600">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full focus:outline-none text-gray-800 font-medium bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-gray-300 rounded-md p-2">
                  <label className="block text-sm text-gray-600">Age</label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    className="w-full focus:outline-none text-gray-800 font-medium"
                  />
                </div>

                <div className="border border-gray-300 rounded-md p-2">
                  <label className="block text-sm text-gray-600">
                    Blood Type
                  </label>
                  <select
                    value={profile.bloodType}
                    onChange={(e) => handleChange("bloodType", e.target.value)}
                    className="w-full focus:outline-none text-gray-800 font-medium bg-white"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="border border-gray-300 rounded-md p-2 flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">
                      Weight (lbs)
                    </label>
                    <input
                      type="number"
                      value={profile.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      className="w-full focus:outline-none text-gray-800 font-medium"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={profile.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      className="w-full focus:outline-none text-gray-800 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Information Section */}
          <div className="px-6 pb-3">
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <Activity size={18} className="text-blue-500 mr-2" />
              Health Information
            </h3>

            <div className="space-y-3">
              <div className="border border-gray-300 rounded-md p-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Allergies:
                </label>
                <textarea
                  value={profile.allergies}
                  onChange={(e) => handleChange("allergies", e.target.value)}
                  className="w-full focus:outline-none text-gray-800"
                  rows={2}
                  placeholder="List medication allergies and other allergies"
                />
              </div>

              <div className="border border-gray-300 rounded-md p-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Current Health Issues:
                </label>
                <textarea
                  value={profile.healthIssues}
                  onChange={(e) => handleChange("healthIssues", e.target.value)}
                  className="w-full focus:outline-none text-gray-800"
                  rows={2}
                  placeholder="Chronic diseases, recent illnesses, etc."
                />
              </div>
            </div>
          </div>

          {/* Current Medication Section */}
          <div className="px-6 pb-3">
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <Heart size={18} className="text-blue-500 mr-2" />
              Medication Information
            </h3>

            <div className="border border-gray-300 rounded-md p-3">
              <label className="block text-sm text-gray-600 mb-1">
                Current Medication:
              </label>
              <textarea
                value={profile.currentMedication}
                onChange={(e) =>
                  handleChange("currentMedication", e.target.value)
                }
                className="w-full focus:outline-none text-gray-800"
                rows={3}
                placeholder="List with dosage & frequency (e.g., Metformin 500mg twice daily)"
              />
            </div>
          </div>

          {/* Doctor & Emergency Contact Section */}
          <div className="px-6 pb-6">
            <div className="border border-gray-300 rounded-md p-3">
              <h3 className="font-medium text-gray-800 mb-2">
                Doctor & Emergency Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-600 w-40">Doctor's Name:</span>
                  <input
                    type="text"
                    value={profile.doctorName}
                    onChange={(e) => handleChange("doctorName", e.target.value)}
                    className="flex-grow focus:outline-none text-gray-800"
                  />
                </div>

                <div className="flex items-center">
                  <span className="text-gray-600 w-40">Doctor's Contact:</span>
                  <div className="flex items-center flex-grow">
                    <Phone size={16} className="text-blue-500 mr-2" />
                    <input
                      type="text"
                      value={profile.doctorContact}
                      onChange={(e) =>
                        handleChange("doctorContact", e.target.value)
                      }
                      className="flex-grow focus:outline-none text-gray-800"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-600 w-40">Primary caretaker:</span>
                  <input
                    type="text"
                    value={profile.caretaker}
                    onChange={(e) => handleChange("caretaker", e.target.value)}
                    className="flex-grow focus:outline-none text-gray-800"
                  />
                </div>

                <div className="flex items-center">
                  <span className="text-gray-600 w-40">SOS contact:</span>
                  <div className="flex items-center flex-grow">
                    <Phone size={16} className="text-blue-500 mr-2" />
                    <input
                      type="text"
                      value={profile.sosContact}
                      onChange={(e) =>
                        handleChange("sosContact", e.target.value)
                      }
                      className="flex-grow focus:outline-none text-gray-800"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-600 w-40">Nearest Pharmacy:</span>
                  <div className="flex items-center flex-grow">
                    <MapPin size={16} className="text-blue-500 mr-2" />
                    <input
                      type="text"
                      value={profile.nearestPharmacy}
                      onChange={(e) =>
                        handleChange("nearestPharmacy", e.target.value)
                      }
                      className="flex-grow focus:outline-none text-gray-800"
                    />
                    <Link
                      to="/pharmacy"
                      className="ml-2 text-blue-600 text-sm hover:text-blue-800"
                    >
                      Find
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md">
            Edit Profile
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md flex space-x-4">
            Save Profile
          </button>
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
            Schedule
          </button>
        </div>
        {/* Save Button */}
      </main>
    </div>
  );
};

export default LogsPage;
