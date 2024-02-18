import axios from "axios";

const productionUrl = "https://hella-booking.onrender.com/api/v1";

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const genders = [
  {
    id: 1,
    gender: "Male",
    value: "male",
  },
  {
    id: 2,
    gender: "Female",
    value: "male",
  },
];
