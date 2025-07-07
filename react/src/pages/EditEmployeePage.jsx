import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import EditEmployeeForm from '../components/EditEmployeeForm/EditEmployeeForm';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, editEmployee } = useEmployeeContext();
  const employee = employees.find(emp => String(emp.id) === id);

  const [name, setName] = useState(employee ? employee.employee_name : '');
  const [salary, setSalary] = useState(employee ? employee.employee_salary : '');
  const [age, setAge] = useState(employee ? employee.employee_age : '');
  const [nameError, setNameError] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!employee) return (
    <div className="dashboard-container">
      <p>No employee found.</p>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );

  const validate = () => {
    let valid = true;
    setNameError('');
    setSalaryError('');
    setAgeError('');
    if (!name.trim()) {
      setNameError('Name is required.');
      valid = false;
    }
    if (!salary || isNaN(salary) || Number(salary) <= 0) {
      setSalaryError('Salary must be a positive number.');
      valid = false;
    }
    if (!age || isNaN(age) || Number(age) <= 0) {
      setAgeError('Age must be a positive number.');
      valid = false;
    }
    return valid;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setSuccess(false);
    setTimeout(() => {
      const updated = { ...employee, employee_name: name, employee_salary: salary, employee_age: age };
      editEmployee(updated);
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    }, 900);
  };

  return (
    <div className="dashboard-container">
      <EditEmployeeForm
        name={name}
        salary={salary}
        age={age}
        onNameChange={setName}
        onSalaryChange={setSalary}
        onAgeChange={setAge}
        onSave={handleSave}
        onCancel={() => navigate('/')}
        nameError={nameError}
        salaryError={salaryError}
        ageError={ageError}
        isLoading={isLoading}
        success={success}
      />
    </div>
  );
};

export default EditEmployeePage; 