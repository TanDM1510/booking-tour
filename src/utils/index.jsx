import axios from "axios";
import { getUserFromLocalStorage } from "./links";

const productionUrl = "https://hella-booking.onrender.com/api/v1";
const user = getUserFromLocalStorage();
const accessToken = user.accessToken;
const refreshToken = user.refreshToken;
const id = user.id;
const bearerToken = `Bearer ${accessToken}:${refreshToken}`;
const customFetch = axios.create({
  baseURL: productionUrl,
  withCredentials: true,
  headers: {
    UserId: id,
    Authorization: bearerToken,
  },
});

customFetch.defaults.headers.common = {
  Authorization: ` ${bearerToken}`,
};
export default customFetch;

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
