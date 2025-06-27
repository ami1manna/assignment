import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeCard from './components/EmployeeCard/EmployeeCard';
import SearchBar from './components/SearchBar/SearchBar';
import { MdDeleteSweep } from 'react-icons/md';
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
      <SearchBar
        value={searchId}
        onChange={setSearchId}
        onSearch={handleSearch}
        onReset={handleReset}
        error={searchError}
      />
      <div className="h2-spacing" />
      
      <h2 className="employee-heading">All Employees</h2>
      {filtered.length > 0 && (
        <>
          <div className="select-controls enhanced-select-controls">
            <label className="select-label">
              <input
                type="checkbox"
                checked={selected.length === filtered.length && filtered.length > 0}
                onChange={handleSelectAll}
                className="select-checkbox"
              />
              Select All
            </label>
            <button
              onClick={handleDeleteSelected}
              disabled={selected.length === 0}
              className="select-btn"
            >
              <MdDeleteSweep size={22} style={{ marginBottom: -3 }} /> Delete Selected
            </button>
            {selected.length > 0 && (
              <span className="select-count">
                {selected.length} selected
              </span>
            )}
          </div>
          <div className="select-divider" />
        </>
      )}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
          <div className="spinner" />
        </div>
      )}
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
