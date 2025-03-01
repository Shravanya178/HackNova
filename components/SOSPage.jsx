import React from "react";
import { Phone, Navigation, Edit } from "lucide-react";

const SOSPage = ({ contacts }) => {
  return (
    <div className="space-y-6">
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
          {contacts.map((contact) => (
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
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <h3 className="font-medium text-blue-700 mb-3">Emergency Options</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Navigation size={18} className="text-blue-600 mr-2" />
              <span>Share Live Location</span>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" id="location-toggle" />
              <label
                htmlFor="location-toggle"
                className="block bg-gray-200 w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out"
              >
                <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out"></span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Phone size={18} className="text-blue-600 mr-2" />
              <span>Auto-Call 911 in Emergency</span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                id="auto-call-toggle"
              />
              <label
                htmlFor="auto-call-toggle"
                className="block bg-gray-200 w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out"
              >
                <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;
