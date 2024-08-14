import axios from "axios";
import { SERVER_URL } from "../../config";

const isAuthTokenExist = (includeAuthToken) => {
  return includeAuthToken !== undefined && includeAuthToken !== null;
};

export const apiCaller = async (
  url,
  method,
  data,
  headers,
  includeAuthToken
) => {
  const authToken = localStorage.getItem("CF_authToken");
  try {
    const response = await axios({
      url: `${SERVER_URL}${url}`,
      method: method,
      data: {
        ...data,
        includeAuthToken: isAuthTokenExist(includeAuthToken)
          ? includeAuthToken
          : true,
      },
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
