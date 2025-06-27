import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeCard from './components/EmployeeCard/EmployeeCard';
import SearchBar from './components/SearchBar/SearchBar';
import EditEmployeeForm from './components/EditEmployeeForm/EditEmployeeForm';
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';
import toast, { Toaster } from 'react-hot-toast';
import { useEmployeeContext } from './context/EmployeeContext';

const App = () => {
  const {
    employees,
    loading,
    error,
    deleteEmployee,
    deleteEmployees,
    searchEmployees,
  } = useEmployeeContext();

  const [searchId, setSearchId] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setFiltered(employees);
    setSelected([]);
  }, [employees]);

  useEffect(() => {
    if (error) {
      toast.error(error, { id: 'fetch-error', duration: 4000 });
    }
  }, [error]);

  const handleSearch = (e) => {
    e.preventDefault();
    const { results, error } = searchEmployees(searchId);
    setFiltered(results);
    setSearchError(error);
  };

  const handleReset = () => {
    setSearchId('');
    setFiltered(employees);
    setSearchError('');
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
    toast.success('Employee deleted!');
  };

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map(emp => emp.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selected.length === 0) return;
    deleteEmployees(selected);
    setSelected([]);
    toast.success('Selected employees deleted!');
  };

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
      <header className="main-header">
        <h1>Employee Dashboard</h1>
        <div className="subtitle">Manage your team efficiently and intuitively</div>
        <div className="section-tag">
          <span className="tag">HR Tool</span>
        </div>
        <div className="instructions">
          <span>Search employees by ID, view details, edit, or delete. Select multiple employees to delete in bulk. Click on a card for more info.</span>
        </div>
      </header>
     
      <SearchBar
        value={searchId}
        onChange={setSearchId}
        onSearch={handleSearch}
        onReset={handleReset}
        error={searchError}
      />
      <h2>All Employees</h2>
      {filtered.length > 0 && (
        <div className="select-controls">
          <label>
            <input
              type="checkbox"
              checked={selected.length === filtered.length && filtered.length > 0}
              onChange={handleSelectAll}
            />
            Select All
          </label>
          <button
            onClick={handleDeleteSelected}
            disabled={selected.length === 0}
          >
            Delete Selected
          </button>
        </div>
      )}
      {loading && <p>Loading employees...</p>}
      <div className="employee-list">
        {filtered.map(emp => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onDelete={() => handleDelete(emp.id)}
            selected={selected.includes(emp.id)}
            onSelect={() => handleSelect(emp.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
