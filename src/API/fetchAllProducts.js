import axios from "axios";
import { SERVER_URL } from "../config";

export const fetchAllProducts = async (selectedFilters) => {
  try {
    const res = await axios.post(`${SERVER_URL}/get-all-products`, {
      filters: selectedFilters,
    });

    return await res.data;
  } catch (error) {
    console.log(error);
  }
};
