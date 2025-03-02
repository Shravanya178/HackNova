import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { MapPin, Settings } from "lucide-react";
import DashboardPage from "./components/DashboardPage";
import PharmacyPage from "./components/PharmacyPage";
import Reminder from "./components/Reminder";
import SchedulePage from "./components/SchedulePage";
import SOSPage from "./components/SOSPage";
import SettingsPage from "./components/SettingsPage";
import LogsPage from "./components/LogsPage";
import HelpPage from "./components/HelpPage";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ProtectedRoute, PublicRoute } from "./components/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/sos" element={<SOSPage />} />
        <Route path="/Help" element={<HelpPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<LogsPage />} />
        <Route path="/privacy" element={<SOSPage />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
