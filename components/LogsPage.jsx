import React from "react";
import { Search, FileText } from "lucide-react";

const LogsPage = ({ logs }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-800">Medication Logs</h2>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by medicine or date..."
            className="w-full p-2 pl-8 border border-gray-300 rounded-md"
          />
          <Search size={16} className="absolute left-2 top-3 text-gray-400" />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-2 px-3 text-left text-sm font-medium text-blue-800">
                Date & Time
              </th>
              <th className="py-2 px-3 text-left text-sm font-medium text-blue-800">
                Medicine
              </th>
              <th className="py-2 px-3 text-left text-sm font-medium text-blue-800">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-blue-50">
                <td className="py-2 px-3 text-sm">
                  {log.date} • {log.time}
                </td>
                <td className="py-2 px-3 text-sm">{log.medicine}</td>
                <td className="py-2 px-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === "Taken"
                        ? "bg-green-100 text-green-800"
                        : log.status === "Missed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Options */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center">
          <FileText size={16} className="mr-2" />
          Export to Google Sheets
        </button>
      </div>
    </div>
  );
};

export default LogsPage;
