import axios from "axios";

const productionUrl = "https://hella-booking.onrender.com/api/v1";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
