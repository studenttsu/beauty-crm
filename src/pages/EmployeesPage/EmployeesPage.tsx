import React, { useEffect, useState } from 'react';

import employeesMock from '../../misc/employeesMock.json';
import { EmployeeCard } from '../../components/EmployeeCard';
import { EmployeeDto } from '../../common/dto/EmployeeDto';
import customersApi from '../../common/api/CustomersApi';

function EmployeesPage() {
    const [employees, setEmployees] = useState<EmployeeDto[]>([]);

    useEffect(() => {
        setEmployees(employeesMock as EmployeeDto[]);
    }, []);

    const removeEmployee = (id: number) => {
        setEmployees(employees.filter(e => e.id !== id));
    };

    const loadCustomers = () => {
        customersApi.getAll();
    }

    return (
        <>
            <h1>Сотрудники</h1>

            <div>
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
            </div>
        </>
    );
}

export default EmployeesPage;