import axios from "axios";

const API_URL = "http://localhost:8080/api/mock-interviews";

// Create Interview Request
export const requestMockInterview = (data) => {
    return axios.post(`${API_URL}/request`, data);
};

// Student View Interviews
export const getStudentInterviews = (studentId) => {
    return axios.get(`${API_URL}/student/${studentId}`);
};

// Mentor View Interviews
export const getMentorInterviews = (mentorId) => {
    return axios.get(`${API_URL}/mentor/${mentorId}`);
};
// Accept Interview
export const acceptInterview = (id, meetingLink) => {
    return axios.put(
        `${API_URL}/accept/${id}?meetingLink=${encodeURIComponent(meetingLink)}`
    );
};

// Reject Interview
export const rejectInterview = (id) => {
    return axios.put(`${API_URL}/reject/${id}`);
};