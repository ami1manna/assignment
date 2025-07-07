import React, { createContext, useContext } from 'react';
import useEmployees from '../hooks/useEmployees';

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const employeeState = useEmployees();
  return (
    <EmployeeContext.Provider value={employeeState}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployeeContext() {
  return useContext(EmployeeContext);
} 