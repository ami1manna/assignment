import React from 'react';
import '../App.css';

const EmployeeDetails = ({ employee }) => {
  if (!employee) return null;
  return (
    <div className="details-panel">
      <h2>Employee Details</h2>
      <ul>
        <li><b>ID:</b> {employee.id}</li>
        <li><b>Name:</b> {employee.employee_name}</li>
        <li><b>Salary:</b> ${employee.employee_salary}</li>
        <li><b>Age:</b> {employee.employee_age}</li>
        <li><b>Profile Image:</b> {employee.profile_image ? <img src={employee.profile_image} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%' }} /> : 'N/A'}</li>
      </ul>
    </div>
  );
};

export default EmployeeDetails; 