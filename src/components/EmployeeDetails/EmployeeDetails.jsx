import React from 'react';
import styles from './EmployeeDetails.module.css';

const EmployeeDetails = ({ employee }) => {
  if (!employee) return null;
  return (
    <div className={styles.detailsPanel}>
      <h2>Employee Details</h2>
      <ul className={styles.detailsList}>
        <li className={styles.detailsItem}><b>ID:</b> {employee.id}</li>
        <li className={styles.detailsItem}><b>Name:</b> {employee.employee_name}</li>
        <li className={styles.detailsItem}><b>Salary:</b> ${employee.employee_salary}</li>
        <li className={styles.detailsItem}><b>Age:</b> {employee.employee_age}</li>
        <li className={styles.detailsItem}><b>Profile Image:</b> {employee.profile_image ? <img src={employee.profile_image} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%' }} /> : 'N/A'}</li>
      </ul>
    </div>
  );
};

export default EmployeeDetails; 