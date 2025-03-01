import React from "react";

const MedicalSchedule = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center">
      {/* First Page */}
      <div className="bg-white rounded-3xl shadow-lg p-6 w-80 mt-10 mb-10">
        <div className="bg-blue-500 text-white rounded-2xl p-4 mb-6">
          <div className="flex items-center mb-4">
            <img
              src="https://placehold.co/40x40"
              alt="User profile"
              className="rounded-full w-10 h-10 mr-3"
            />
            <div>
              <p>Hello, Natasha</p>
              <p className="text-sm">How you feel today?</p>
            </div>
            <i className="fas fa-bell ml-auto"></i>
          </div>
          <p className="text-sm">Your next doctor appointment date is</p>
          <p className="text-2xl font-bold">12 December 2023</p>
          <div className="flex items-center mt-4">
            <img
              src="https://placehold.co/40x40"
              alt="Doctor profile"
              className="rounded-full w-10 h-10 mr-3"
            />
            <div>
              <p className="font-semibold">Dr. Smith Stuard</p>
              <p className="text-sm">Cardiologist</p>
            </div>
            <p className="ml-auto">02:30 PM</p>
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-4">Upcoming Medicine</h2>
          {["Seclo-20", "Alatrol", "Napa - 1"].map((medicine, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2"
            >
              <div className="flex items-center">
                <img
                  src="https://placehold.co/20x20"
                  alt="Medicine icon"
                  className="w-5 h-5 mr-3"
                />
                <div>
                  <p className="font-semibold">{medicine}</p>
                  <p className="text-sm">Omiprazole-20 (Capsule)</p>
                </div>
              </div>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <i className="fas fa-home text-xl"></i>
          <i className="fas fa-plus-circle text-3xl text-blue-500"></i>
          <i className="fas fa-user text-xl"></i>
        </div>
      </div>
    </div>
  );
};

export default MedicalSchedule;
