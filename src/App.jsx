import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://dummy.restapiexample.com/api/v1/employees');
        const data = await res.json();
        if (data.status === 'success') {
          setEmployees(data.data);
        } else {
          setError('Failed to fetch employees.');
        }
      } catch (e) {
        setError('Error fetching employees.');
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>
      <p>Browse all employees below. Each card shows basic info.</p>
      {loading && <p>Loading employees...</p>}
      {error && <p className="error">{error}</p>}
      <div className="employee-list">
        {employees.map(emp => (
          <div className="employee-card" key={emp.id}>
            <h2>{emp.employee_name}</h2>
            <p><strong>Salary:</strong> ${emp.employee_salary}</p>
            <p><strong>Age:</strong> {emp.employee_age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
