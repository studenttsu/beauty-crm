import React, { useEffect, useState } from 'react';
import './App.css';

import employeesMock from './misc/employeesMock.json';
import { EmployeeCard } from './components/EmployeeCard';
import { AuthForm } from './components/AuthForm';
import { EmployeeDto } from './common/dto/EmployeeDto';
import { useAuth } from './contexts/AuthContext';
import customersApi from './common/api/CustomersApi';

function App() {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    setEmployees(employeesMock as EmployeeDto[]);
  }, []);

  const removeEmployee = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const loadCustomers = () => {
    customersApi.getAll();
  }
 
  if (!isLoggedIn) {
    return <AuthForm onLogin={login} />;
  }

  return (
    <>
      <header>
        <nav>
          Navigation
        </nav>

        <button onClick={logout}>Logout</button>
      </header>

      <main>
        <button onClick={loadCustomers}>Load Customers</button>

        <div>
          {employees.map(employee => (
            <EmployeeCard 
              key={employee.id}
              onClick={() => removeEmployee(employee.id)}
              fullName={employee.fullName} 
              photo={employee.photo} />
          ))}

          {!employees.length && 'Список пуст'}
        </div>
      </main>
    </>
  );
}

export default App;
