import api from "@/utils/api"; // This uses your configured Axios instance

const SWAPS_BASE_URL = "/swaps";


export const createSwapRequest = async (data) => {
  const response = await api.post("/swaps/", data);
  return response.data;
};

// Get all swaps for the current user
export const fetchSwapRequests = async () => {
  const response = await api.get("/swaps/");
  return response.data;
};

// Update swap status (e.g. accept/decline)
export const updateSwapStatus = async (id, status) => {
  const response = await api.patch(`/swaps/${id}/`, { status });
  return response.data;
};

// Cancel or delete a swap request
export const deleteSwapRequest = async (id) => {
  const response = await api.delete(`/swaps/${id}/`);
  return response.data;
};

// propose a swap for a specific item
export const proposeSwap = async (targetItemId, offeredItemId) => {
  const response = await api.post("/swaps/", {
    requested_item: targetItemId,
    offered_item: offeredItemId,
  });
  return response.data;
}

export const acceptSwapRequest = async (swapId) => {
  const response = await api.patch(`${SWAPS_BASE_URL}/${swapId}/`, {
    status: "accepted",
  });
  return response.data;
};

export const declineSwapRequest = async (swapId) => {
  const response = await api.patch(`${SWAPS_BASE_URL}/${swapId}/`, {
    status: "declined",
  });
  return response.data;
};

// Get swap detail by ID
export const getSwapById = async (id) => {
  try {
    const response = await api.get(`/swaps/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching swap by ID:', error);
    return null;
  }
};

// Post message to swap thread
export const postSwapMessage = async (swapId, data) => {
  try {
    const response = await api.post(`/swaps/${swapId}/messages/`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting swap message:', error);
    return null;
  }
};