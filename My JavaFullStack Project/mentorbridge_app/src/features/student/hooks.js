import { useState, useEffect } from 'react';
import {
  getStudentProfile,
  updateStudentProfile,
  getAllMentors,
  searchMentors,
  sendMentorRequest,
  getStudentBookings
} from '../../services/authService';
import { uploadResume, getResume } from '../../services/resumeService';
import {
  requestMockInterview,
  getStudentInterviews
} from '../../services/mockInterviewService';

/**
 * Hook to manage student profile and related data
 */
export function useStudentData() {
  const [student, setStudent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [resume, setResume] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const profileResponse = await getStudentProfile(email);
      setStudent(profileResponse.data);
      
      await Promise.all([
        fetchBookings(profileResponse.data.id),
        fetchResume(profileResponse.data.id),
        fetchInterviews(profileResponse.data.id),
      ]);
    } catch (err) {
      setError('Failed to load student data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async (studentId) => {
    try {
      const response = await getStudentBookings(studentId);
      setBookings(response.data || []);
    } catch (err) {
      console.log('Failed to fetch bookings:', err);
    }
  };

  const fetchResume = async (studentId) => {
    try {
      const response = await getResume(studentId);
      setResume(response.data);
    } catch (err) {
      console.log('Resume not uploaded yet');
    }
  };

  const fetchInterviews = async (studentId) => {
    try {
      const response = await getStudentInterviews(studentId);
      setInterviews(response.data || []);
    } catch (err) {
      console.log('No interviews yet:', err);
    }
  };

  const fetchMentors = async (searchTerm = '') => {
    try {
      setLoading(true);
      if (searchTerm.trim()) {
        const response = await searchMentors(searchTerm);
        setMentors(response.data || []);
      } else {
        const response = await getAllMentors();
        setMentors(response.data || []);
      }
    } catch (err) {
      setError('Failed to fetch mentors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    student,
    setStudent,
    bookings,
    setBookings,
    resume,
    setResume,
    interviews,
    setInterviews,
    mentors,
    setMentors,
    loading,
    error,
    fetchStudentData,
    fetchBookings,
    fetchResume,
    fetchInterviews,
    fetchMentors,
  };
}

/**
 * Hook to handle mentor requests
 */
export function useMentorRequests() {
  const sendRequest = async (studentId, mentorId, message) => {
    try {
      const response = await sendMentorRequest({
        studentId,
        mentorId,
        message,
      });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to send request' };
    }
  };

  return { sendRequest };
}

/**
 * Hook to handle resume upload
 */
export function useResumeUpload() {
  const uploadResumeFile = async (studentId, file) => {
    try {
      const formData = new FormData();
      formData.append('studentId', studentId);
      formData.append('file', file);
      
      const response = await uploadResume(formData);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message || 'Upload failed' };
    }
  };

  return { uploadResumeFile };
}

/**
 * Hook to handle mock interview requests
 */
export function useMockInterview() {
  const requestInterview = async (studentId, mentorId, topic, preferredDate, preferredTime) => {
    try {
      const response = await requestMockInterview({
        studentId,
        mentorId,
        topic,
        preferredDate,
        preferredTime,
      });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to request interview' };
    }
  };

  return { requestInterview };
}

/**
 * Hook to handle profile updates
 */
export function useProfileUpdate() {
  const updateProfile = async (studentId, profileData) => {
    try {
      const payload = {
        ...profileData,
        yearOfStudy: profileData.yearOfStudy ? Number(profileData.yearOfStudy) : null,
      };
      
      const response = await updateStudentProfile(studentId, payload);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message || 'Profile update failed' };
    }
  };

  return { updateProfile };
}
