import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};
