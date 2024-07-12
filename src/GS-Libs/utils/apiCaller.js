import axios from "axios";
import { SERVER_URL } from "../../config";

export const apiCaller = async (url, method, data = {}, headers = {}) => {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = await axios({
      url: `${SERVER_URL}${url}`,
      method: method,
      data: data,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
    return await response.data;
  } catch (error) {
    // Handle error here
    console.error("Error making API call:", error);
    throw error;
  }
};
