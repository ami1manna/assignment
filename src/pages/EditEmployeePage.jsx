import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import '../App.css';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, editEmployee } = useEmployeeContext();
  const employee = employees.find(emp => String(emp.id) === id);

  const [name, setName] = useState(employee ? employee.employee_name : '');
  const [salary, setSalary] = useState(employee ? employee.employee_salary : '');
  const [age, setAge] = useState(employee ? employee.employee_age : '');

  if (!employee) return (
    <div className="details-panel">
      <p>No employee found.</p>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...employee, employee_name: name, employee_salary: salary, employee_age: age };
    editEmployee(updated);
    navigate('/');
  };

  return (
    <div className="details-panel">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSave} className="edit-form">
        <label>Name: <input value={name} onChange={e => setName(e.target.value)} /></label><br />
        <label>Salary: <input value={salary} onChange={e => setSalary(e.target.value)} /></label><br />
        <label>Age: <input value={age} onChange={e => setAge(e.target.value)} /></label><br />
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')} style={{ marginLeft: 8 }}>Cancel</button>
      </form>
    </div>
  );
};

export default EditEmployeePage; 