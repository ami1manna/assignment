import React from 'react';
import styles from './EmployeeCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import getInitials from '../../utils/getInitials';
import { MdAttachMoney, MdCalendarToday, MdEdit, MdDelete } from 'react-icons/md';

const EmployeeCard = ({ employee, onDelete, selected, onSelect }) => {
  const navigate = useNavigate();
  const handleCardClick = (e) => {
    // Prevent click if Edit, Delete button, or checkbox is clicked
    if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.type === 'checkbox') return;
    navigate(`/employee/${employee.id}`);
  };

  return (
    <div className={styles.employeeCard} style={{ cursor: 'pointer', position: 'relative' }} onClick={handleCardClick}>
      {/* Multi-select checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        onClick={e => e.stopPropagation()}
        className={styles.selectCheckbox}
        style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}
        aria-label="Select employee"
      />
      <div className={styles.avatar}>
        {employee.profile_image ? (
          <img src={employee.profile_image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          getInitials(employee.employee_name)
        )}
      </div>
      <h2 className={styles.heading}>{employee.employee_name}</h2>
      <div className={styles.divider}></div>
      <div className={styles.detailsRow}>
        <p className={styles.text}><MdAttachMoney size={20} color="#1976d2" style={{marginRight: 4}} /><strong>Salary:</strong> ${employee.employee_salary}</p>
        <p className={styles.text}><MdCalendarToday size={18} color="#1976d2" style={{marginRight: 4}} /><strong>Age:</strong> {employee.employee_age}</p>
      </div>
      <div style={{ marginTop: 18, display: 'flex', gap: 10, width: '100%', justifyContent: 'center' }}>
        <Link to={`/employee/${employee.id}/edit`} onClick={e => e.stopPropagation()}>
          <button type="button" className={styles.cardBtn}><MdEdit size={18} style={{marginRight: 6, marginBottom: -2}} />Edit</button>
        </Link>
        <button type="button" className={`${styles.cardBtn} ${styles.delete}`} onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(); }}><MdDelete size={18} style={{marginRight: 6, marginBottom: -2}} />Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard; 