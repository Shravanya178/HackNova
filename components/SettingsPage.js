import React, { useState } from "react";
import {
  Bell,
  Globe,
  VolumeX,
  Volume2,
  Trash2,
  AlertTriangle,
} from "lucide-react";

const SettingsPage = () => {
  // State for various settings
  const [language, setLanguage] = useState("English");
  const [voiceReminders, setVoiceReminders] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    sms: false,
    email: true,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Toggle voice reminders
  const toggleVoiceReminders = () => {
    setVoiceReminders((prev) => !prev);
  };

  // Toggle notification settings
  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Handle account deletion confirmation
  const confirmDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    alert(
      "Account deletion process initiated. You will receive a confirmation email."
    );
    setShowDeleteConfirm(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Language Section */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <Globe className="mr-2 text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-700">
            Language Selection
          </h2>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <label
            htmlFor="language-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select your preferred language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            This will change the language throughout the application
          </p>
        </div>
      </section>

      {/* Voice Reminders Section */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          {voiceReminders ? (
            <Volume2 className="mr-2 text-blue-600" size={20} />
          ) : (
            <VolumeX className="mr-2 text-gray-600" size={20} />
          )}
          <h2 className="text-lg font-semibold text-gray-700">
            Voice-Based Reminders
          </h2>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Enable voice-based medication reminders
              </p>
              <p className="text-xs text-gray-500">
                App will speak reminders aloud instead of just displaying them
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={voiceReminders}
                onChange={toggleVoiceReminders}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Notification Preferences Section */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <Bell className="mr-2 text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-700">
            Notification Preferences
          </h2>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm mb-3">
            Select how you'd like to receive notifications:
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-gray-500">
                  Receive alerts directly on your device
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => toggleNotification("push")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SMS</p>
                <p className="text-xs text-gray-500">
                  Get text messages for important reminders
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() => toggleNotification("sms")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-gray-500">
                  Receive detailed summary reports
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => toggleNotification("email")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Account Section */}
      <section className="mb-4">
        <div className="border border-red-200 bg-red-50 p-4 rounded-md">
          <div className="flex items-center mb-3">
            <Trash2 className="mr-2 text-red-600" size={20} />
            <h2 className="text-lg font-semibold text-red-700">
              Delete Account
            </h2>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            Permanently remove your account and all associated data. This action
            cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Delete Account
            </button>
          ) : (
            <div className="bg-red-100 border border-red-200 p-3 rounded">
              <div className="flex items-start mb-3">
                <AlertTriangle className="text-red-600 mr-2" size={20} />
                <p className="text-sm text-red-700">
                  Are you sure you want to delete your account?
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={confirmDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;