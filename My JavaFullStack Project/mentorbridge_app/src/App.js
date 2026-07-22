import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import MentorRequests from "./pages/MentorRequests";
import HomePage from './pages/HomePage';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import MentorLogin from './pages/MentorLogin';
import MentorSignup from './pages/MentorSignup';
import AdminLogin from './pages/AdminLogin';
import ChatPage from "./pages/ChatPage";

import StudentDashboardRouter from './features/student/StudentDashboardRouter';
import MentorDashboard from './pages/MentorDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />

        <Route path="/mentor/login" element={<MentorLogin />} />
        <Route path="/mentor/signup" element={<MentorSignup />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* New Modular Student Dashboard */}
        <Route path="/student/dashboard/*" element={<StudentDashboardRouter />} />

        <Route path="/mentor/dashboard/*" element={<MentorDashboard />} />
        <Route path="/mentor/*" element={<MentorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/mentor/requests" element={<MentorRequests />} />
        <Route path="/chat/:bookingId" element={<ChatPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
