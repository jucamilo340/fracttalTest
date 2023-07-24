import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Alert } from "../../components";
import { LoginValidation } from "../../utils/validations";
import logo from "../../assets/images/logoF.png";
import backGround from "../../assets/images/backGround.webp";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const { signup,signin, error,loadingRq, isAuthenticated } = useAuth();
  const initialValues = { email: "", password: "" };
  const [alert, setalert] = useState(false);
  const [type, settype] = useState(1);
  const navigate = useNavigate();
  //Verifica la ruta si el usuario ya inicio sesion
  useEffect(() => {
    if (isAuthenticated) navigate("/Home");
  }, [isAuthenticated]);

  useEffect(()=> {
    if(error !== ''){
      setalert(true);
    }else{
      setalert(false);
    }
  },[error]);

  const handleSubmit = async(values: typeof initialValues) => {
    if(type === 1){
      await signin(values);
    }else {
      await signup(values);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src={backGround} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <div className="flex justify-center w-full">
            <img className="h-24" src={logo} alt="" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            {type === 1 ?  'Login' : 'Crear Cuenta'}
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginValidation}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched}) => (
              <Form className="mt-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email Address"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${
                      touched.email && errors.email ? "border-red-500" : ""
                    }`}
                    autoComplete="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    minLength={8}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button loading={loadingRq} type="submit" text={type === 1 ? "Entrar" : "Registrarse"} />
              </Form>
            )}
          </Formik>
   {type === 1 ?
   <>
          <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-8">
            No tienes Cuenta?{" "}
            <span
              onClick={()=> settype(2)}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
              Crear una cuenta
            </span>
          </p>
          </>
        :
        <>
        <hr className="my-6 border-gray-300 w-full" />
        <p className="mt-8">
          Ya tienes cuenta{" "}
          <span
            onClick={()=> settype(1)}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Inicia sesion
          </span>
        </p>
        </>

          }
        </div>
      </div>
      <Alert error show={alert} onClose={()=> {setalert(false);}}  title={error} />
    </div>
  );
};

export default Login;
