import React from "react";
import { Search } from "lucide-react";

const PharmacyPage = ({ medications }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-800">Nearby Pharmacies</h2>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for pharmacies..."
            className="w-full p-2 pl-8 border border-gray-300 rounded-md"
          />
          <Search size={16} className="absolute left-2 top-3 text-gray-400" />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center border border-blue-100">
        <p className="text-gray-500">Google Maps would integrate here</p>
      </div>

      {/* Pharmacies List */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <h3 className="font-medium text-blue-700 mb-3">Nearby Pharmacies</h3>
        <div className="space-y-4">
          <div className="border-b border-blue-50 pb-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">MediCare Pharmacy</p>
                <p className="text-sm text-gray-600">
                  0.8 miles away • Open until 9 PM
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    (48 reviews)
                  </span>
                </div>
              </div>
              <button className="bg-blue-100 text-blue-700 px-3 py-1 h-8 rounded-md text-sm">
                Call
              </button>
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-700">
                Available Medications:
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {medications.map((med) => (
                  <span
                    key={med.id}
                    className={`text-xs px-2 py-1 rounded-full ${
                      med.id % 2 === 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {med.name} {med.id % 2 === 0 ? "✓" : "✗"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-b border-blue-50 pb-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">City Drug Store</p>
                <p className="text-sm text-gray-600">
                  1.2 miles away • Open until 10 PM
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <span key={star} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                    <span className="text-gray-300 text-xs">★</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    (32 reviews)
                  </span>
                </div>
              </div>
              <button className="bg-blue-100 text-blue-700 px-3 py-1 h-8 rounded-md text-sm">
                Call
              </button>
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-700">
                Available Medications:
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {medications.map((med) => (
                  <span
                    key={med.id}
                    className={`text-xs px-2 py-1 rounded-full ${
                      med.id !== 2
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {med.name} {med.id !== 2 ? "✓" : "✗"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;
