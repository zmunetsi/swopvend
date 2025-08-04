import api from "@/utils/api";

// Change password for logged-in user (requires old_password, new_password1, new_password2)
export const changePassword = async ({ old_password, new_password1, new_password2 }) => {
  const response = await api.post(
    "/auth/password/change/",
    {
      old_password,
      new_password1,
      new_password2,
    },
    { withCredentials: true }
  );
  return response.data;
};

// Deactivate account
export const deactivateAccount = async () => {
  const response = await api.post(
    "/account/deactivate/",
    {},
    { withCredentials: true }
  );
  return response.data;
};

// Delete account
export const deleteAccount = async () => {
  const response = await api.delete(
    "/account/delete/",
    { withCredentials: true }
  );
  return response.data;
};