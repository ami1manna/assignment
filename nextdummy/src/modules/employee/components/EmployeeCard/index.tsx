'use client';

import React from 'react';
import styles from '../../styles/EmployeeCard.module.scss';
import { Employee } from '../../types';
import { useRouter } from 'next/navigation';

interface EmployeeCardProps {
  employee: Employee;
  onDelete?: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onDelete }) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if delete button is clicked
    if ((e.target as HTMLElement).closest('button')) return;
    router.push(`/employee/${employee.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.name}>{employee.employee_name}</div>
      <div className={styles.details}>
        Age: {employee.employee_age} | Salary: ${employee.employee_salary}
      </div>
      {onDelete && (
        <button className={styles.deleteButton} onClick={() => onDelete(employee.id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default EmployeeCard; 