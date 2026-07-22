import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const studentRegister = (data) => {
  return axios.post(`${BASE_URL}/students/register`, data);
};

export const studentLogin = (data) => {
  return axios.post(`${BASE_URL}/students/login`, data);
};

export const mentorRegister = (data) => {
  return axios.post(`${BASE_URL}/mentors/register`, data);
};

export const mentorLogin = (data) => {
  return axios.post(`${BASE_URL}/mentors/login`, data);
};

export const adminLogin = (data) => {
  return axios.post(`${BASE_URL}/admin/login`, data);
};
export const getStudentProfile = (email) => {
  return axios.get(`${BASE_URL}/students/profile?email=${email}`);
};

export const updateStudentProfile = (id, data) => {
  return axios.put(`${BASE_URL}/students/profile/${id}`, data);
};

export const getAllMentors = () => {
  return axios.get(`${BASE_URL}/mentors/all`);
};

export const searchMentors = (keyword) => {
  return axios.get(`${BASE_URL}/mentors/search?keyword=${keyword}`);
};
export const getMentorProfile = (email) => {
  return axios.get(`${BASE_URL}/mentors/profile?email=${email}`);
};

export const updateMentorProfile = (id, data) => {
  return axios.put(`${BASE_URL}/mentors/profile/${id}`, data);
};

export const getAllStudents = () => {
  return axios.get(`${BASE_URL}/students/all`);
};

export const searchStudents = (keyword) => {
  return axios.get(`${BASE_URL}/students/search?keyword=${keyword}`);
};
export const sendMentorRequest = (data) => {
    return axios.post(`${BASE_URL}/requests/send`, data);
};

export const getStudentRequests = (studentId) => {
    return axios.get(`${BASE_URL}/requests/student/${studentId}`);
};

export const getMentorPendingRequests = (mentorId) => {
    return axios.get(`${BASE_URL}/requests/mentor/${mentorId}`);
};

export const acceptMentorRequest = (requestId) => {
    return axios.put(`${BASE_URL}/requests/${requestId}/accept`);
};

export const rejectMentorRequest = (requestId) => {
    return axios.put(`${BASE_URL}/requests/${requestId}/reject`);
};

export const bookSession = (data) => {
    return axios.post(`${BASE_URL}/bookings`, data);
};

export const getStudentBookings = (studentId) => {
    return axios.get(`${BASE_URL}/bookings/student/${studentId}`);
};

export const getMentorBookings = (mentorId) => {
    return axios.get(`${BASE_URL}/bookings/mentor/${mentorId}`);
};

export const approveBooking = (bookingId) => {
    return axios.put(`${BASE_URL}/bookings/${bookingId}/approve`);
};

export const rejectBooking = (bookingId) => {
    return axios.put(`${BASE_URL}/bookings/${bookingId}/reject`);
};