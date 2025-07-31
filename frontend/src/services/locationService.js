import api from "@/utils/api";

export const fetchCountries = async () => {
  try {
    const response = await api.get("/countries/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCities = async (countryId = null) => {
  try {
    let url = "/cities/";
    if (countryId) {
      url += `?country=${countryId}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};