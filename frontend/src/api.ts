import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const sendMessage = async (message: string) => {
    try {
        const response = await axios.post(`${API_URL}/message`, { message });
        return response.data;
    } catch (error) {
        console.error('Error sending message to AI agent:', error);
        throw error;
    }
};