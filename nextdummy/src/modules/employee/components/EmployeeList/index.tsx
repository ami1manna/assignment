'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../styles/EmployeeList.module.scss';
import SearchBar from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchEmployeesAsync, deleteEmployee, deleteSelectedEmployees, toggleSelect, selectAll, clearSelection } from '../../employeeSlice';
import { useRouter } from 'next/navigation';

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { employees, loading, error, selectedEmployeeIds } = useAppSelector((state) => state.employee);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployeesAsync());
    }
  }, [dispatch, employees.length]);

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  const handleCardClick = (id: number) => {
    router.push(`/employee/${id}`);
  };

  const handleCheckboxChange = (id: number) => {
    dispatch(toggleSelect(id));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteSelectedEmployees());
  };

  const handleSelectAll = () => {
    dispatch(selectAll());
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  const filteredEmployees = employees.filter(emp =>
    emp.employee_name.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) return <div className={styles.loading}>Loading employees...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const allSelected = filteredEmployees.length > 0 && filteredEmployees.every(emp => selectedEmployeeIds.includes(emp.id));
  const anySelected = selectedEmployeeIds.length > 0;

  return (
    <div className={styles.employeeList}>
      <div className={styles.container}>
        <h1 className={styles.title}>Employee Directory</h1>
        
        <div className={styles.searchContainer}>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {anySelected && (
          <div className={styles.multiDeleteBar}>
            <span>{selectedEmployeeIds.length} selected</span>
            <button className={styles.multiDeleteButton} onClick={handleDeleteSelected}>
              Delete Selected
            </button>
            <button className={styles.clearSelectionButton} onClick={handleClearSelection}>
              Clear
            </button>
            <button className={styles.selectAllButton} onClick={handleSelectAll} disabled={allSelected}>
              Select All
            </button>
          </div>
        )}
        
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
                  <input
                    type="checkbox"
                    className={styles.selectCheckbox}
                    checked={selectedEmployeeIds.includes(emp.id)}
                    onChange={e => {
                      e.stopPropagation();
                      handleCheckboxChange(emp.id);
                    }}
                    onClick={e => e.stopPropagation()}
                  />
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