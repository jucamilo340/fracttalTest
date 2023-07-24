import React, { useEffect, useState } from "react";
import { useEmployees } from "../../context/employeeContext";
import FormE from "../../components/FormE";
import { Alert } from "../../components";
import { Spinner } from "../../components/Spinner";
import logo from "../../assets/images/logoF.png";
import { formatDate } from "../../utils/constans";
import { useAuth } from "../../context/authContext";

const Home: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { employees, getEmployees, deleteEmployee,loading, error, setError }  = useEmployees();
  const { logout } = useAuth();
  const [currentE, setcurrentE] = useState<any>({});
  const [alert, setalert] = useState(false);
  useEffect(()=> {
    if(error !== ''){
      setalert(true);
    }else{
      setalert(false);
      setError('');
    }
  },[error]);
  useEffect(() => {
    getEmployees();
  }, []);
  return (
  <div>
    <div className="bg-indigo-400 px-9 py-2 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <img className="h-16 w" src={logo} alt="" />
        </div>
        <button onClick={()=> logout()} className="mt-5 sm:mt-0 px-4 py-2 h-10 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">Cerrar sesion</button>
    </div>
    <div className="container px-10 max-w-7xl mx-auto mt-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold decoration-gray-400">Empleados</h1>
        <div className="flex justify-start sm:justify-end mt-2">
          <button onClick={()=> setShowCreate(true)} className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">Crear Empleado</button>
        </div>
      </div>
    {!loading ?
    employees.length !== 0 ?
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Descripción del cargo
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colSpan={3}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {employees.map((employee:any,index)=>(
                <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex items-center">{employee._id}</div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{employee.name}</div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <p>{employee.description}</p>
                </td>

                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                  <span>{formatDate(employee.date)}</span>
                </td>

                <td onClick={()=> {setcurrentE(employee); setShowEdit(true)}} className="cursor-pointer text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                  <span className="text-indigo-600 hover:text-indigo-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </span>
                </td>

                <td onClick={()=> deleteEmployee(employee._id)} className="cursor-pointer text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                  <span><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg></span>
                </td>
              </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      :
      <div className="flex mt-14 w-full justify-center">
        <h1 className="text-2xl font-bold decoration-gray-400">No hay Empleados</h1>
      </div>

    :
    <Spinner/>
    }

      <FormE onClose={()=> setShowCreate(false)} type={1} show={showCreate} />
      <FormE onClose={()=> setShowEdit(false)} type={2} employee={currentE} show={showEdit} />
      <Alert error show={alert} onClose={()=> {setalert(false); setError('');}}  title={error} />
    </div>
  </div>
  );
};

export default Home;

