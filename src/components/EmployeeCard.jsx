import React from 'react';
import '../App.css';

const EmployeeCard = ({ employee, onClick, onDelete, onEdit }) => {
  return (
    <div className="employee-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <h2>{employee.employee_name}</h2>
      <p><strong>Salary:</strong> ${employee.employee_salary}</p>
      <p><strong>Age:</strong> {employee.employee_age}</p>
      {(onDelete || onEdit) && (
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          {onEdit && <button type="button" className="card-btn" onClick={e => { e.stopPropagation(); onEdit(); }}>Edit</button>}
          {onDelete && <button type="button" className="card-btn delete" onClick={e => { e.stopPropagation(); onDelete(); }}>Delete</button>}
        </div>
      )}
    </div>
  );
};

export default EmployeeCard; 