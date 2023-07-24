import axios from "../utils/axios";
import { User } from "../utils/Interfaces";

export const registerRequest = async (user:User) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user:User) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async (token:string) => {
    axios.defaults.headers.common['Authorization'] = `${token}`;
    return axios.get(`/auth/verify`);
};