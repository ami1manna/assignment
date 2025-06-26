import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://dummy.restapiexample.com/api/v1/employees');
        const data = await res.json();
        if (data.status === 'success') {
          setEmployees(data.data);
          setFiltered(data.data);
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    if (!searchId.trim()) {
      setFiltered(employees);
      return;
    }
    const found = employees.filter(emp => String(emp.id) === searchId.trim());
    if (found.length === 0) {
      setSearchError('No employee found with that ID.');
    }
    setFiltered(found);
  };

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <h1>Employee Dashboard</h1>
        <p className="subtitle">Welcome! This dashboard lets you browse, search, and manage employees easily.</p>
      </header>
      <section className="section-tag">
        <span className="tag">Search by ID</span>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Employee ID (e.g., 1)"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={() => { setSearchId(''); setFiltered(employees); setSearchError(''); }}>Reset</button>
        </form>
        <p className="instructions">Type an employee ID and click <b>Search</b> to filter. Click <b>Reset</b> to see all employees.</p>
        {searchError && <p className="error">{searchError}</p>}
      </section>
      <section className="section-tag">
        <span className="tag">All Employees</span>
        <p className="instructions">Below are all employees. Each card shows their name, salary, and age.</p>
        {loading && <p>Loading employees...</p>}
        {error && <p className="error">{error}</p>}
        <div className="employee-list">
          {filtered.map(emp => (
            <div className="employee-card" key={emp.id}>
              <h2>{emp.employee_name}</h2>
              <p><strong>Salary:</strong> ${emp.employee_salary}</p>
              <p><strong>Age:</strong> {emp.employee_age}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
