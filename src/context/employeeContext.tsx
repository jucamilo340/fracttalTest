import Cookies from "js-cookie";
import { createContext, useContext, useState, ReactNode } from "react";
import {
  createEmployeeRequest,
  deleteEmployeeRequest,
  getEmployeesRequest,
  getEmployeeRequest,
  updateEmployeeRequest,
} from "../services/employees";

interface Employee {
  _id: string;
}

interface EmployeeContextValue {
  employees: Employee[];
  message:string,
  error:string,
  loading:boolean,
  setError: (errorMessage: string) => void;
  setmessage: (Message: string) => void;
  getEmployees: () => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  createEmployee: (employee: any) => Promise<void>;
  getEmployee: (id: string) => Promise<Employee | undefined>;
  updateEmployee: (e: any) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextValue | null>(null);

export const useEmployees = (): EmployeeContextValue => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("useEmployees must be used within a EmployeeProvider");
  return context;
};

interface EmployeeProviderProps {
  children: ReactNode;
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState<string>('');
  const [message, setmessage] = useState('');

  const getEmployees = async () => {
    setloading(true);
    const cookies = Cookies.get();
    const res = await getEmployeesRequest(cookies.token);
    setEmployees(res.data);
    setloading(false);
  };
  //Eliminar un empleado
  const deleteEmployee = async (id: string) => {
    setloading(true);
    try {
      const res = await deleteEmployeeRequest(id);
      if (res.status === 204) setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
    } catch (error:any) {
      setError(error.message);
    }
    setloading(false);
  };
  //Crear un empleado
  const createEmployee = async (employee: any) => {
    setloading(true);
    try {
      const res = await createEmployeeRequest(employee);
      if (res.status === 200) {
        setmessage('Empleado creado exitosamente');
      };
      getEmployees();
    } catch (error:any) {
      const validateError = error?.response ? error.response.data.message : error.message;
      setError(validateError);
    }
    setloading(false);
  };
  //Obtener empleados
  const getEmployee = async (id: string) => {
    try {
      const res = await getEmployeeRequest(id);
      return res.data;
    } catch (error:any) {
      setError(error.message);
    }
  };
  //Actualizar un empleado
  const updateEmployee = async (e: any) => {
    setloading(true);
    try {
      const res = await updateEmployeeRequest(e);
      if (res.status === 200){ 
        setmessage('Empleado editado exitosamente');
        getEmployees();
      }
    } catch (error:any) {
      const validateError = error?.response ? error.response.data.message : error.message;
      setError(validateError);
    }
    setloading(false);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        getEmployees,
        deleteEmployee,
        createEmployee,
        getEmployee,
        updateEmployee,
        message,
        loading,
        setError,
        setmessage,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
