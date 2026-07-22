import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";


// Create Booking
export const createBooking = async (bookingData) => {
    return await axios.post(API_URL, bookingData);
};


// Get Student Bookings
export const getStudentBookings = async (studentId) => {
    return await axios.get(
        `${API_URL}/student/${studentId}`
    );
};


// Get Mentor Bookings
export const getMentorBookings = async (mentorId) => {
    return await axios.get(
        `${API_URL}/mentor/${mentorId}`
    );
};


// Approve Booking
export const approveBooking = async (bookingId) => {
    return await axios.put(
        `${API_URL}/${bookingId}/approve`
    );
};


// Reject Booking
export const rejectBooking = async (bookingId) => {
    return await axios.put(
        `${API_URL}/${bookingId}/reject`
    );
};