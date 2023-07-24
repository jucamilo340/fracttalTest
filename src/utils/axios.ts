import axios, {AxiosInstance} from "axios";
import {API_GO_BY_URL} from "../config/constants";

const instance: AxiosInstance = axios.create({
    baseURL: API_GO_BY_URL,
    headers: {
        "Accept": 'application/json',
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
});

export default instance;