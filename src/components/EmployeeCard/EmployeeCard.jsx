import React from 'react';
import styles from './EmployeeCard.module.css';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee, onDelete }) => {
  const navigate = useNavigate();
  const handleCardClick = (e) => {
    // Prevent click if Edit or Delete button is clicked
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    navigate(`/employee/${employee.id}`);
  };

  return (
    <div className={styles.employeeCard} style={{ cursor: 'pointer' }} onClick={handleCardClick}>
      <h2 className={styles.heading}>{employee.employee_name}</h2>
      <p className={styles.text}><strong>Salary:</strong> ${employee.employee_salary}</p>
      <p className={styles.text}><strong>Age:</strong> {employee.employee_age}</p>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Link to={`/employee/${employee.id}/edit`} onClick={e => e.stopPropagation()}>
          <button type="button" className={styles.cardBtn}>Edit</button>
        </Link>
        <button type="button" className={`${styles.cardBtn} ${styles.delete}`} onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(); }}>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard; 