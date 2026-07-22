import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from './components/StudentLayout';
import DashboardHome from './pages/DashboardHome';
import StudentProfile from './pages/StudentProfile';
import MentorSearch from './pages/MentorSearch';
import BookingPage from './pages/BookingPage';
import ResumePage from './pages/ResumePage';
import MockInterviewPage from './pages/MockInterviewPage';
import { NotificationsPage, SettingsPage } from './pages/PlaceholderPages';
import StudentChat from '../../pages/student/StudentChat';
import BookingForm from '../../components/BookingForm';

/**
 * Student Dashboard Router
 * Handles all student dashboard routes
 */
function StudentDashboardRouter() {
  return (
    <StudentLayout>
      <Routes>
        {/* Main Dashboard */}
        <Route index element={<DashboardHome />} />
        <Route path="home" element={<DashboardHome />} />

        {/* Feature Pages */}
        <Route path="profile" element={<StudentProfile />} />
        <Route path="mentors" element={<MentorSearch />} />
        <Route path="bookings" element={<BookingPage />} />
        <Route path="bookings/new" element={<BookingForm />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="interviews" element={<MockInterviewPage />} />

        {/* Secondary Pages */}
        <Route path="messages/*" element={<StudentChat />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
      </Routes>
    </StudentLayout>
  );
}

export default StudentDashboardRouter;
