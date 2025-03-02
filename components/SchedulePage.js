import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [medications, setMedications] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState("not-authenticated");
  const [selectedDay, setSelectedDay] = useState(null);

  // Define navigation links
  const navLinks = [
    { path: "/pharmacy", label: "Pharmacy" },
    { path: "/profile", label: "Profile" },
    { path: "/settings", label: "Settings" },
    { path: "/help", label: "Help" }
  ];

  // Mock medications - would come from your database in a real app
  const mockMedications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      time: "8:00 AM",
      refillsLeft: 15,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      time: "7:00 PM",
      refillsLeft: 30,
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      time: "9:00 PM",
      refillsLeft: 3,
    },
  ];

  // Google Calendar API simulation functions
  const simulateGoogleAuth = () => {
    setIsLoading(true);
    // In a real implementation, this would redirect to Google OAuth flow
    setTimeout(() => {
      setAuthStatus("authenticated");
      setIsLoading(false);
    }, 800);
  };

  const fetchGoogleCalendarEvents = async () => {
    // This simulates the fetch from Google Calendar API
    setIsLoading(true);

    // Create events based on medications for the current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Create start and end dates for the current month
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate medication events for each day in the month
    const newEvents = [];

    const currentDay = new Date(startDate);
    while (currentDay <= endDate) {
      mockMedications.forEach((med) => {
        // Parse time components
        const timeParts = med.time.split(" ")[0].split(":");
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const ampm = med.time.split(" ")[1];

        // Create event date
        const eventDate = new Date(currentDay);
        eventDate.setHours(
          ampm === "PM" && hours !== 12
            ? hours + 12
            : ampm === "AM" && hours === 12
            ? 0
            : hours,
          minutes
        );

        newEvents.push({
          id: `${med.id}-${eventDate.toISOString()}`,
          title: `${med.name} ${med.dosage}`,
          start: eventDate,
          medication: med,
        });
      });

      // Move to next day
      currentDay.setDate(currentDay.getDate() + 1);
    }

    setEvents(newEvents);
    setIsLoading(false);
  };

  // Helper functions for calendar
  const getDayNames = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, events: [] });
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);

      // Find events for this day
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });

      days.push({
        date,
        isToday:
          i === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
        events: dayEvents,
      });
    }

    return days;
  };

  const formatMonthYear = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  // Add medication event to Google Calendar
  const addMedicationToCalendar = (medication) => {
    // In a real implementation, this would call the Google Calendar API
    // to create a new event
    alert(
      `Creating calendar event for ${medication.name} ${medication.dosage}`
    );
  };

  // Effect to load medications (would fetch from API in real app)
  useEffect(() => {
    setMedications(mockMedications);
  }, []);

  // Effect to fetch Google Calendar events when month changes or auth status changes
  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchGoogleCalendarEvents();
    }
  }, [currentDate, authStatus]);

  // Effect to generate calendar days when events are loaded
  useEffect(() => {
    setCalendarDays(generateCalendarDays());
  }, [events, currentDate]);

  // Get events for the selected day
  const getSelectedDayEvents = () => {
    if (!selectedDay) return [];

    return events
      .filter((event) => {
        const eventDate = new Date(event.start);
        const day = selectedDay.date;

        return (
          eventDate.getDate() === day.getDate() &&
          eventDate.getMonth() === day.getMonth() &&
          eventDate.getFullYear() === day.getFullYear()
        );
      })
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navigation Bar with Border - REPLACED WITH YOUR CUSTOM NAVBAR */}
      <div className="w-full border-b-2 border-gray-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <NavBar links={navLinks} />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="p-4 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-semibold">Hello, How are you today?</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
            {/* Calendar Header */}
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold mb-2 sm:mb-0">
                Medication Schedule
              </h2>

              {authStatus === "not-authenticated" ? (
                <button
                  onClick={simulateGoogleAuth}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  disabled={isLoading}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {isLoading ? "Connecting..." : "Connect Google Calendar"}
                </button>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-md"
                    disabled={isLoading}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="font-medium mx-4">
                    {formatMonthYear(currentDate)}
                  </div>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-md"
                    disabled={isLoading}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Calendar Body */}
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="text-gray-500">Loading calendar...</div>
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 bg-gray-100">
                  {getDayNames().map((day, index) => (
                    <div key={index} className="p-2 text-center font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => day.date && setSelectedDay(day)}
                      className={`min-h-24 p-1 border-t border-l ${
                        day.isToday ? "bg-blue-50" : ""
                      } ${!day.date ? "bg-gray-50" : ""} ${
                        selectedDay &&
                        day.date &&
                        selectedDay.date.getDate() === day.date.getDate()
                          ? "ring-2 ring-inset ring-blue-500"
                          : ""
                      } ${day.date ? "cursor-pointer hover:bg-gray-50" : ""}`}
                    >
                      {day.date && (
                        <>
                          <div className="text-right mb-1">
                            <span
                              className={`inline-block rounded-full w-6 h-6 text-center ${
                                day.isToday ? "bg-blue-500 text-white" : ""
                              }`}
                            >
                              {day.date.getDate()}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {day.events.slice(0, 3).map((event, i) => (
                              <div
                                key={i}
                                className={`text-xs p-1 rounded truncate ${
                                  event.medication.refillsLeft < 10
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {new Date(event.start).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                - {event.title}
                              </div>
                            ))}
                            {day.events.length > 3 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{day.events.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Day Events */}
            {selectedDay && (
              <div className="mt-6 border rounded-md p-4">
                <h3 className="font-medium text-lg mb-2">
                  Events for {selectedDay.date.toLocaleDateString()}
                </h3>
                <div className="space-y-2">
                  {getSelectedDayEvents().length > 0 ? (
                    getSelectedDayEvents().map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 border-b"
                      >
                        <div className="w-16 text-sm">
                          {new Date(event.start).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="flex-1 ml-2">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500">
                            Refills left: {event.medication.refillsLeft}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-4">
                      No events scheduled for this day
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stock Low Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">STOCK LOW</h2>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                  SOS
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-2">Low Stock Medications:</h3>
              <div className="space-y-2">
                {medications
                  .filter((med) => med.refillsLeft < 10)
                  .map((med) => (
                    <div key={med.id} className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{med.name}</div>
                          <div className="text-sm text-gray-500">
                            {med.dosage} - {med.time}
                          </div>
                        </div>
                        <div className="text-red-500 font-medium">
                          {med.refillsLeft} left
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t flex justify-end">
                        <button
                          onClick={() => addMedicationToCalendar(med)}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center"
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Upcoming Medication Events */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Today's Schedule</h3>
              <div className="space-y-2">
                {events
                  .filter((event) => {
                    const today = new Date();
                    const eventDate = new Date(event.start);
                    return (
                      eventDate.getDate() === today.getDate() &&
                      eventDate.getMonth() === today.getMonth() &&
                      eventDate.getFullYear() === today.getFullYear()
                    );
                  })
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 border rounded-md"
                    >
                      <div className="w-12 text-sm">
                        {new Date(event.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="flex-1 ml-2">
                        <div className="font-medium">{event.title}</div>
                      </div>
                      {event.medication.refillsLeft < 10 && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  ))}
                {events.filter((event) => {
                  const today = new Date();
                  const eventDate = new Date(event.start);
                  return (
                    eventDate.getDate() === today.getDate() &&
                    eventDate.getMonth() === today.getMonth() &&
                    eventDate.getFullYear() === today.getFullYear()
                  );
                }).length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    No medications scheduled for today
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="w-full bg-gray-100 border-t border-gray-200 p-4">
        <div className="flex justify-center space-x-4 max-w-6xl mx-auto">
          <button className="px-8 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex-1 text-center">
            Dashboard
          </button>
          <button className="px-8 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex-1 text-center">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
