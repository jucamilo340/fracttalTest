import axios from "../utils/axios";
import { Employee } from "../utils/Interfaces";

export const getEmployeesRequest = async (token:string) => {
  axios.defaults.headers.common['Authorization'] = `${token}`;
  return axios.get("/employees");
};

export const createEmployeeRequest = async (employee:Employee) => axios.post("/employees", employee);

export const updateEmployeeRequest = async (employee:any) =>
  axios.put(`/employees/${employee._id}`, employee);

export const deleteEmployeeRequest = async (id:string) => axios.delete(`/employees/${id}`);

export const getEmployeeRequest = async (id:string) => axios.get(`/employees/${id}`);