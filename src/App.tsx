import React from 'react';
import { AuthProvider } from './context/authContext';
import { EmployeeProvider } from './context/employeeContext';
import RoutesApp from './routes/routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <RoutesApp/>
      </EmployeeProvider>
    </AuthProvider>
  );
};

export default App;

