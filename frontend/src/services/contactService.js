import api from "@/utils/api";

// Send a contact message
export const sendContactMessage = async (data) => {
  try {
    const response = await api.post("/contact-messages/", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};