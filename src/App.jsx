import React, { useEffect, useState } from 'react';
import './App.css';
import EmployeeCard from './components/EmployeeCard';
import SearchBar from './components/SearchBar';
import SectionTag from './components/SectionTag';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [selected, setSelected] = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [editAge, setEditAge] = useState('');

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
    setSelected(null);
    setEditEmp(null);
  };

  const handleReset = () => {
    setSearchId('');
    setFiltered(employees);
    setSearchError('');
    setSelected(null);
    setEditEmp(null);
  };

  const handleDelete = (id) => {
    const newList = filtered.filter(emp => emp.id !== id);
    setFiltered(newList);
    setEmployees(employees.filter(emp => emp.id !== id));
    if (selected && selected.id === id) setSelected(null);
    if (editEmp && editEmp.id === id) setEditEmp(null);
  };

  const handleEdit = (emp) => {
    setEditEmp(emp);
    setEditName(emp.employee_name);
    setEditSalary(emp.employee_salary);
    setEditAge(emp.employee_age);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const updated = { ...editEmp, employee_name: editName, employee_salary: editSalary, employee_age: editAge };
    setEmployees(employees.map(emp => emp.id === updated.id ? updated : emp));
    setFiltered(filtered.map(emp => emp.id === updated.id ? updated : emp));
    setEditEmp(null);
  };

  const handleCardClick = (emp) => {
    setSelected(emp);
    setEditEmp(null);
  };

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <h1>Employee Dashboard</h1>
        <p className="subtitle">Welcome! This dashboard lets you browse, search, and manage employees easily.</p>
      </header>
      <SectionTag tag="Search by ID">
        <SearchBar
          value={searchId}
          onChange={setSearchId}
          onSearch={handleSearch}
          onReset={handleReset}
          error={searchError}
        />
        <p className="instructions">Type an employee ID and click <b>Search</b> to filter. Click <b>Reset</b> to see all employees.</p>
      </SectionTag>
      <SectionTag tag="All Employees">
        <p className="instructions">Below are all employees. Each card shows their name, salary, and age. Click a card for details. Use Edit/Delete for actions.</p>
        {loading && <p>Loading employees...</p>}
        {error && <p className="error">{error}</p>}
        <div className="employee-list">
          {filtered.map(emp => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onClick={() => handleCardClick(emp)}
              onDelete={() => handleDelete(emp.id)}
              onEdit={() => handleEdit(emp)}
            />
          ))}
        </div>
      </SectionTag>
      {selected && !editEmp && (
        <div className="details-panel">
          <h2>Employee Details</h2>
          <ul>
            <li><b>ID:</b> {selected.id}</li>
            <li><b>Name:</b> {selected.employee_name}</li>
            <li><b>Salary:</b> ${selected.employee_salary}</li>
            <li><b>Age:</b> {selected.employee_age}</li>
            <li><b>Profile Image:</b> {selected.profile_image ? <img src={selected.profile_image} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%' }} /> : 'N/A'}</li>
          </ul>
        </div>
      )}
      {editEmp && (
        <div className="details-panel">
          <h2>Edit Employee (Mock)</h2>
          <form onSubmit={handleEditSave} className="edit-form">
            <label>Name: <input value={editName} onChange={e => setEditName(e.target.value)} /></label><br />
            <label>Salary: <input value={editSalary} onChange={e => setEditSalary(e.target.value)} /></label><br />
            <label>Age: <input value={editAge} onChange={e => setEditAge(e.target.value)} /></label><br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditEmp(null)} style={{ marginLeft: 8 }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
