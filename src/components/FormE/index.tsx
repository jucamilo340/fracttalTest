import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Alert, Button } from "..";
import { Employee } from "../../utils/Interfaces";
import { employeeValidation } from "../../utils/validations";
import { useEmployees } from "../../context/employeeContext";

interface ModalProps {
  show: boolean;
  type:number;
  employee?:Employee;
  onClose: () => void;
}
const FormE: React.FC<ModalProps> = ({ show, onClose,type,employee }) => {
  const { createEmployee, updateEmployee,setmessage, loading, message } = useEmployees();
  const [sucess, setsucess] = useState(true);
  useEffect(()=> {
    if(message !== ''){
      setsucess(true);
    }else{
      setsucess(false);
      setmessage('');
      onClose();
    }
  },[message]);
  const handleSubmit = async (values:Employee) => {
    try {
      if (employee) {
        const editEmployee = {
          _id:employee._id,
          name:values.name,
          description:values.description
        }
        updateEmployee(editEmployee);
      } else {
        createEmployee(values);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!show) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-500 opacity-75" onClick={onClose} />

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-20 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <span className="close-icon absolute top-0 right-0 mt-4 mr-4 text-gray-700 cursor-pointer" onClick={onClose}>
            &#10005;
          </span>

          <h1 className="text-2xl font-bold mb-4">{type === 1 ? 'Crear Empleado' : 'Editar Empleado'}</h1>
          <Formik
            initialValues={{
              name: employee ? employee.name : "",
              description: employee ? employee.description : "",
            }}
            validationSchema={employeeValidation}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, values}) => (
              <Form className="mt-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700">
                    Nombre
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingresa tu nombre"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${
                      touched.name && errors.name ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="description" className="block text-gray-700">
                    Descripción del cargo
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    placeholder="Ingresa una descripción"
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${
                      touched.description && errors.description ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
                <Button loading={loading} disabled={values.name === '' || values.description === ''} type="submit" text={type === 1 ? "Crear" : "Editar"} />
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Alert show={sucess} onClose={()=> {setsucess(false); setmessage(''); onClose()}}  title={message} />
    </div>
  );
};

export default FormE;
