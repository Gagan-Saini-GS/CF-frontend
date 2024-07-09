import axios from "axios";
import { SERVER_URL } from "../config";

export const fetchAllProducts = async (
  selectedFilters,
  searchQuery,
  page,
  limit
) => {
  try {
    const res = await axios.post(`${SERVER_URL}/get-all-products`, {
      filters: selectedFilters,
      searchQuery: searchQuery,
      page: page,
      limit: limit,
    });

    return await res.data;
  } catch (error) {
    console.log(error);
  }
};
