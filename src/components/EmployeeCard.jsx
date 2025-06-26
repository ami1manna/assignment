import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const EmployeeCard = ({ employee, onDelete }) => {
  return (
    <Link to={`/employee/${employee.id}`} style={{ textDecoration: 'none' }}>
      <div className="employee-card" style={{ cursor: 'pointer' }}>
        <h2>{employee.employee_name}</h2>
        <p><strong>Salary:</strong> ${employee.employee_salary}</p>
        <p><strong>Age:</strong> {employee.employee_age}</p>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Link to={`/employee/${employee.id}/edit`} onClick={e => e.stopPropagation()}>
            <button type="button" className="card-btn">Edit</button>
          </Link>
          <button type="button" className="card-btn delete" onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(); }}>Delete</button>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeCard; 