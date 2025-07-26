import api from "@/utils/api";

export const fetchNotifications = async (cookieHeader) => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/notifications/`, {
      cache: 'no-store',
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await api.patch(`/notifications/${id}/`, { is_read: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};