import React from 'react';
import styles from './EmployeeDetails.module.css';
import getInitials from '../../utils/getInitials';

const EmployeeDetails = ({ employee }) => {
  if (!employee) return null;
  return (
    <div className={styles.detailsPanel}>
      <div className={styles.avatar}>
        {employee.profile_image ? (
          <img src={employee.profile_image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          getInitials(employee.employee_name)
        )}
      </div>
      <h2 className={styles.heading}>Employee Details</h2>
      <div className={styles.divider}></div>
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