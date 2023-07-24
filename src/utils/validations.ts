import * as Yup from 'yup';
export const LoginValidation = Yup.object().shape({
    email: Yup.string().email('Por favor, ingresa un email válido').required('Por favor, rellena este campo'),
    password: Yup.string().min(8, 'Debe ser de al menos 8 caracteres')
    .required('Contraseña inválida'),
});

export const employeeValidation = Yup.object().shape({
    name: Yup.string().required('Por favor, rellena este campo'),
    description: Yup.string().required('Por favor, rellena este campo'),
});

