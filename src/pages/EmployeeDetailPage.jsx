import React from 'react';
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const { employees } = useEmployeeContext();
  const employee = employees.find(emp => String(emp.id) === id);

  if (!employee) return (
    <div className="details-panel">
      <p>No employee found.</p>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );

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
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default EmployeeDetailPage; 