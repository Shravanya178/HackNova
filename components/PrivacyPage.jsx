import React, { useState } from "react";
import { Lock, Shield, Users, Info } from "lucide-react";

const PrivacyPage = () => {
  const [partnerCode, setPartnerCode] = useState("");
  const [dataPermission, setDataPermission] = useState("read-only");
  const [showCodeCopied, setShowCodeCopied] = useState(false);

  // Generate unique partner code
  const generatePartnerCode = () => {
    const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setPartnerCode(newCode);
  };

  // Copy code to clipboard
  const copyCodeToClipboard = () => {
    if (partnerCode) {
      navigator.clipboard.writeText(partnerCode);
      setShowCodeCopied(true);
      setTimeout(() => setShowCodeCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex items-center mb-6">
        <Lock className="mr-3 text-blue-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">
          Privacy & Data Sharing
        </h1>
      </div>

      {/* Partner Code Section */}
      <section className="mb-8 bg-gray-50 p-5 rounded-lg">
        <div className="flex items-center mb-4">
          <Users className="mr-2 text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-700">
            Secure Data Sharing
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generate Unique Partner Code
          </label>
          <p className="text-sm text-gray-600 mb-3">
            For caregivers to access your health logs and records
          </p>
          <div className="flex">
            <input
              type="text"
              value={partnerCode}
              readOnly
              className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="No code generated yet"
            />
            <button
              onClick={copyCodeToClipboard}
              disabled={!partnerCode}
              className={`bg-gray-200 text-gray-700 px-3 py-2 ${
                !partnerCode
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              Copy
            </button>
            <button
              onClick={generatePartnerCode}
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
            >
              Generate
            </button>
          </div>
          {showCodeCopied && (
            <p className="text-xs text-green-600 mt-1">
              Code copied to clipboard!
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Set Data Permissions
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="read-only"
                name="permission"
                checked={dataPermission === "read-only"}
                onChange={() => setDataPermission("read-only")}
                className="mr-2"
              />
              <label htmlFor="read-only" className="text-sm">
                Read-only access
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="full-access"
                name="permission"
                checked={dataPermission === "full-access"}
                onChange={() => setDataPermission("full-access")}
                className="mr-2"
              />
              <label htmlFor="full-access" className="text-sm">
                Full access
              </label>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Read-only allows viewing but not modifying your data. Full access
            allows both viewing and editing.
          </p>
        </div>
      </section>

      {/* Encryption & Security Section */}
      <section className="mb-6 bg-gray-50 p-5 rounded-lg">
        <div className="flex items-center mb-4">
          <Shield className="mr-2 text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-700">
            Encryption & Security
          </h2>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex">
            <Info className="text-blue-600 mt-1 mr-2" size={18} />
            <div>
              <p className="text-sm text-gray-800 mb-2">
                Your data is protected with end-to-end encryption
              </p>
              <p className="text-xs text-gray-600">
                All health information is securely stored and transmitted using
                industry-standard encryption protocols. Only you and those you
                explicitly grant access to can view your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Security Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <h3 className="font-medium text-gray-800">
                Two-Factor Authentication
              </h3>
              <p className="text-xs text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <h3 className="font-medium text-gray-800">Data Backup</h3>
              <p className="text-xs text-gray-600">
                Automatic cloud backup of your health data
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                defaultChecked
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
