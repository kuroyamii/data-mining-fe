import axios from "axios";

export const BaseAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
});
