import { useState, useEffect } from 'react';
import {
  getMentorProfile,
  updateMentorProfile,
  getMentorPendingRequests,
  acceptMentorRequest,
  rejectMentorRequest,
  getMentorBookings,
  approveBooking,
  rejectBooking
} from '../../services/authService';
import { getMentorInterviews, acceptInterview, rejectInterview } from '../../services/mockInterviewService';
import { addResumeFeedback } from '../../services/resumeService';

export function useMentorData() {
  const [mentor, setMentor] = useState(null);
  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');

  useEffect(() => {
    fetchMentorData();
  }, []);

  const fetchMentorData = async () => {
    try {
      setLoading(true);
      const profileResponse = await getMentorProfile(email);
      setMentor(profileResponse.data);
      localStorage.setItem('mentorId', profileResponse.data.id);

      await Promise.all([
        fetchRequests(profileResponse.data.id),
        fetchBookings(profileResponse.data.id),
        fetchInterviews(profileResponse.data.id)
      ]);
    } catch (err) {
      setError('Failed to load mentor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async (mentorId) => {
    try {
      const res = await getMentorPendingRequests(mentorId);
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async (mentorId) => {
    try {
      const res = await getMentorBookings(mentorId);
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInterviews = async (mentorId) => {
    try {
      const res = await getMentorInterviews(mentorId);
      setInterviews(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptMentorRequest(requestId);
      if (mentor) fetchRequests(mentor.id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await rejectMentorRequest(requestId);
      if (mentor) fetchRequests(mentor.id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      await approveBooking(bookingId);
      if (mentor) fetchBookings(mentor.id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleRejectBooking = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      if (mentor) fetchBookings(mentor.id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleAcceptInterview = async (interviewId, link) => {
    try {
      await acceptInterview(interviewId, link);
      if (mentor) fetchInterviews(mentor.id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleRejectInterview = async (interviewId) => {
    try {
      await rejectInterview(interviewId);
      if (mentor) fetchInterviews(mentor.id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleSaveFeedback = async (studentId, feedback) => {
    try {
      await addResumeFeedback({ studentId, feedback });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const res = await updateMentorProfile(mentor.id, profileData);
      setMentor(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    mentor,
    requests,
    bookings,
    interviews,
    loading,
    error,
    fetchMentorData,
    handleAcceptRequest,
    handleRejectRequest,
    handleApproveBooking,
    handleRejectBooking,
    handleAcceptInterview,
    handleRejectInterview,
    handleSaveFeedback,
    handleUpdateProfile
  };
}
