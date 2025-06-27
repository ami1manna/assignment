import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import getInitials from '../utils/getInitials';
import { MdBadge, MdPerson, MdAttachMoney, MdCalendarToday, MdImage, MdArrowBack } from 'react-icons/md';
import styles from './EmployeeDetailPage.module.css';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const { employees } = useEmployeeContext();
  const employee = employees.find(emp => String(emp.id) === id);

  if (!employee) return (
    <div className="dashboard-container">
      <div className={styles.detailsPanel}>
        <p>No employee found.</p>
        <Link to="/" className={styles.backBtn}><MdArrowBack size={20} style={{marginRight: 6, marginBottom: -3}} />Back to Dashboard</Link>
      </div>
    </div>
  );

  const hasProfileImage = employee.profile_image && employee.profile_image.trim() !== '';

  return (
    <div className="dashboard-container">
      <div className={styles.detailsPanel}>
        <div className={styles.avatar}>
          {hasProfileImage ? (
            <img src={employee.profile_image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', boxShadow: '0 2px 12px rgba(25,118,210,0.18)' }} />
          ) : employee.employee_name ? (
            <span className={styles.initialsCircle}>{getInitials(employee.employee_name)}</span>
          ) : (
            <span className={styles.defaultIcon}><MdPerson size={48} color="#fff" /></span>
          )}
        </div>
        <h2 className={styles.heading}>Employee Details</h2>
        <div className={styles.subtitle}>Comprehensive profile information</div>
        <div className={styles.divider}></div>
        <ul className={styles.detailsList}>
          <li className={styles.detailsItem}><MdBadge size={22} color="#1976d2" className={styles.detailsItemIcon} /><b>ID:</b> {employee.id}</li>
          <li className={styles.detailsItem}><MdPerson size={22} color="#1976d2" className={styles.detailsItemIcon} /><b>Name:</b> {employee.employee_name}</li>
          <li className={styles.detailsItem}><MdAttachMoney size={22} color="#1976d2" className={styles.detailsItemIcon} /><b>Salary:</b> ${employee.employee_salary}</li>
          <li className={styles.detailsItem}><MdCalendarToday size={22} color="#1976d2" className={styles.detailsItemIcon} /><b>Age:</b> {employee.employee_age}</li>
          <li className={styles.detailsItem}><MdImage size={22} color="#1976d2" className={styles.detailsItemIcon} /><b>Profile Image:</b> {hasProfileImage ? <img src={employee.profile_image} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%', boxShadow: '0 1px 6px rgba(25,118,210,0.10)' }} /> : <span className={styles.defaultIconSmall}><MdPerson size={28} color="#fff" /></span>}</li>
        </ul>
        <Link to="/" className={styles.backBtn}><MdArrowBack size={20} style={{marginRight: 6, marginBottom: -3}} />Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default EmployeeDetailPage; 