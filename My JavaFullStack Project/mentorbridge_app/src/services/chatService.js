import axios from "axios";

const BASE_URL = "http://localhost:8080/api/chat";

export const sendMessage = (data) => {
    return axios.post(`${BASE_URL}/send`, data);
};

export const getMessages = (bookingId) => {
    return axios.get(`${BASE_URL}/${bookingId}`);
};