import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Plus,
  Phone,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Pill,
  Heart,
} from "lucide-react";

const HelpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Reference for scrolling
  const guidelinesRef = useRef(null);
  const resourcesRef = useRef(null);
  const supportRef = useRef(null);
  const faqRef = useRef(null);

  // FAQ items
  const faqItems = [
    {
      id: 1,
      question: "How do I add a new medication?",
      answer:
        "Tap the + button on the main screen, then fill in the medication details including name, dosage, schedule, and current stock. You can also set reminders for when to take your medication.",
    },
    {
      id: 2,
      question: "What does the SOS button do?",
      answer:
        "The SOS button provides quick access to emergency contacts and information in case of a medical emergency. It contains your critical health information and emergency contact numbers.",
    },
    {
      id: 3,
      question: "How can I check for potential drug interactions?",
      answer:
        "Go to the Pharmacy tab and select 'Check Interactions' on your medication. You can also use the OpenFDA resource link in the Resources section of this Help page.",
    },
    {
      id: 4,
      question: "How do I update my medication schedule?",
      answer:
        "Go to the Schedule tab, select the medication you want to update, then tap 'Edit Schedule' to change your medication timing or frequency.",
    },
    {
      id: 5,
      question: "What do I do when my medication is running low?",
      answer:
        "When a medication is running low, you'll see a 'STOCK LOW' warning on the Dashboard. Tap on the medication to quickly request a refill or set a reminder to refill it.",
    },
  ];

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  // Scroll to section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
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
          className={`font-bold whitespace-nowrap px-2 md:px-4 text-blue-600`}
          onClick={() => navigate("/help")}
        >
          Help
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow px-4 pb-4 overflow-y-auto">
        <div className="py-4">
          <h1 className="text-2xl font-bold mb-4">Help Center</h1>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              className="border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center"
              onClick={() => scrollToSection(guidelinesRef)}
            >
              <BookOpen size={24} className="mb-2" />
              <span className="text-sm font-medium">App Guidelines</span>
            </button>
            <button
              className="border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center"
              onClick={() => scrollToSection(resourcesRef)}
            >
              <FileText size={24} className="mb-2" />
              <span className="text-sm font-medium">Resources</span>
            </button>
            <button
              className="border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center"
              onClick={() => scrollToSection(supportRef)}
            >
              <Phone size={24} className="mb-2" />
              <span className="text-sm font-medium">Support Contacts</span>
            </button>
            <button
              className="border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center"
              onClick={() => scrollToSection(faqRef)}
            >
              <HelpCircle size={24} className="mb-2" />
              <span className="text-sm font-medium">FAQ</span>
            </button>
          </div>

          {/* App Guidelines Section */}
          <div ref={guidelinesRef} className="mb-8">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <BookOpen size={20} className="mr-2" />
              App Guidelines
            </h2>
            <div className="border-2 border-black rounded-lg p-4">
              <h3 className="font-bold mb-2">Getting Started</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                  Add your medications through the + button on the Dashboard
                </li>
                <li>Set up your medication schedule under the Schedule tab</li>
                <li>Customize reminder notifications in Settings</li>
                <li>Add emergency contacts through your Profile page</li>
              </ul>

              <h3 className="font-bold mb-2">Daily Usage</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Check your Dashboard for today's medications</li>
                <li>Mark medications as taken when you take them</li>
                <li>Monitor your inventory with the "Stock Low" warnings</li>
                <li>Use the SOS button in case of emergency</li>
              </ul>

              <h3 className="font-bold mb-2">Managing Medications</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Update medication details through the Pharmacy tab</li>
                <li>Check for interactions before adding new medications</li>
                <li>Track your medication history in Profile</li>
              </ul>
            </div>
          </div>

          {/* OpenFDA Resources Section */}
          <div ref={resourcesRef} className="mb-8">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <FileText size={20} className="mr-2" />
              Resources
            </h2>
            <div className="border-2 border-black rounded-lg p-4">
              <h3 className="font-bold mb-2">Medication Safety</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <AlertTriangle size={18} className="text-yellow-500 mr-2" />
                    <h4 className="font-bold">OpenFDA Drug Interactions</h4>
                  </div>
                  <p className="text-sm mb-2">
                    Check potential interactions between your medications and
                    food or other drugs.
                  </p>
                  <button className="text-blue-600 text-sm flex items-center">
                    Visit Resource <ExternalLink size={14} className="ml-1" />
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Pill size={18} className="text-blue-500 mr-2" />
                    <h4 className="font-bold">Medication Guides</h4>
                  </div>
                  <p className="text-sm mb-2">
                    Access official medication guides for your prescriptions.
                  </p>
                  <button className="text-blue-600 text-sm flex items-center">
                    Visit Resource <ExternalLink size={14} className="ml-1" />
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <FileText size={18} className="text-green-500 mr-2" />
                    <h4 className="font-bold">Dietary Guidelines</h4>
                  </div>
                  <p className="text-sm mb-2">
                    Learn about food-drug interactions and dietary
                    recommendations.
                  </p>
                  <button className="text-blue-600 text-sm flex items-center">
                    Visit Resource <ExternalLink size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Support Contacts Section */}
          <div ref={supportRef} className="mb-8">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <Phone size={20} className="mr-2" />
              Support Contacts
            </h2>
            <div className="border-2 border-black rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Emergency Services</h3>
                  <button className="w-full border border-red-200 bg-red-50 rounded-lg p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <Phone size={18} className="text-red-500 mr-2" />
                      <span>Emergency Services</span>
                    </div>
                    <span className="font-bold">911</span>
                  </button>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Mental Health Support</h3>
                  <div className="space-y-2">
                    <button className="w-full border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart size={18} className="text-blue-500 mr-2" />
                        <span>National Suicide Prevention Lifeline</span>
                      </div>
                      <span className="font-bold">988</span>
                    </button>

                    <button className="w-full border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart size={18} className="text-blue-500 mr-2" />
                        <span>Crisis Text Line</span>
                      </div>
                      <span className="font-bold">Text HOME to 741741</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Physical Health Support</h3>
                  <div className="space-y-2">
                    <button className="w-full border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Phone size={18} className="text-green-500 mr-2" />
                        <span>Poison Control Center</span>
                      </div>
                      <span className="font-bold">1-800-222-1222</span>
                    </button>

                    <button className="w-full border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Phone size={18} className="text-green-500 mr-2" />
                        <span>Nurse Advice Line</span>
                      </div>
                      <span className="font-bold">1-800-XXX-XXXX</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div ref={faqRef} className="mb-4">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <HelpCircle size={20} className="mr-2" />
              Frequently Asked Questions
            </h2>
            <div className="border-2 border-black rounded-lg p-4">
              <div className="space-y-3">
                {faqItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full p-3 flex justify-between items-center bg-gray-50"
                      onClick={() => toggleFaq(item.id)}
                    >
                      <span className="font-bold text-left">
                        {item.question}
                      </span>
                      {expandedFaq === item.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                    {expandedFaq === item.id && (
                      <div className="p-3 bg-white">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Always at bottom */}
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
    </div>
  );
};

export default HelpPage;
