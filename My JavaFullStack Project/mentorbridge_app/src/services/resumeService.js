import axios from "axios";

const API_URL = "http://localhost:8080/api/resume";

// Upload Resume
export const uploadResume = (formData) => {
    return axios.post(`${API_URL}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Get Resume
export const getResume = (studentId) => {
    return axios.get(`${API_URL}/${studentId}`);
};

// Add Feedback
export const addResumeFeedback = (data) => {
    return axios.put(`${API_URL}/feedback`, data);
};
export const downloadResume = (studentId) => {
    return axios.get(`${API_URL}/download/${studentId}`, {
        responseType: "blob",
    });
};