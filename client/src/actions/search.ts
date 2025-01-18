import axios from "axios";

const searchQuery = async (query: string) => {
  try {
    const payload = { query };

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/search`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default searchQuery;
