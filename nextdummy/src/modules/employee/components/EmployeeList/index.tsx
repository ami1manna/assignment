'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styles from '../../styles/EmployeeList.module.scss';
import SearchBar from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchEmployeesAsync, deleteEmployee } from '../../employeeSlice';
import { useRouter } from 'next/navigation';

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { employees, loading, error } = useAppSelector((state) => state.employee);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchEmployeesAsync());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  const handleCardClick = (id: number) => {
    router.push(`/employee/${id}`);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.employee_name.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) return <div className={styles.loading}>Loading employees...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.employeeList}>
      <div className={styles.container}>
        <h1 className={styles.title}>Employee Directory</h1>
        
        <div className={styles.searchContainer}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        
        {filteredEmployees.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No employees found</h3>
            <p>{search ? 'Try adjusting your search terms' : 'No employees available'}</p>
          </div>
        ) : (
          <div className={styles.employeeGrid}>
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className={styles.employeeItem} onClick={() => handleCardClick(emp.id)}>
                <div className={styles.employeeCard}>
                  <div className={styles.employeeAvatar}>
                    {getInitials(emp.employee_name)}
                  </div>
                  
                  <div className={styles.employeeName}>{emp.employee_name}</div>
                  
                  <div className={styles.employeeDetails}>
                    <div className={styles.employeeAge}>Age: {emp.employee_age}</div>
                    <div className={styles.employeeSalary}>Salary: ${emp.employee_salary.toLocaleString()}</div>
                  </div>
                  
                  <button 
                    className={styles.deleteButton} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(emp.id);
                    }}
                    title="Delete employee"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList; 