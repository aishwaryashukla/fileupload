//import axios from 'axios';
let API_BASE_URL = import.meta.env.VITE_API_URL;;

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
  
      if (response.status === 200 && response.data.token) {
        return response.data; // { token: '...' }
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error("API login error:", err);
      // Customize error message based on server response or fallback
      if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("Unable to login. Please try again.");
      }
    }
  }; 
