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
    searchEmployees,
  } = useEmployeeContext();

  const [searchId, setSearchId] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    setFiltered(employees);
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

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
      <header className="main-header">
        <h1>Employee Dashboard</h1>
      </header>
      <h2>Search by ID</h2>
      <SearchBar
        value={searchId}
        onChange={setSearchId}
        onSearch={handleSearch}
        onReset={handleReset}
        error={searchError}
      />
      <h2>All Employees</h2>
      {loading && <p>Loading employees...</p>}
      <div className="employee-list">
        {filtered.map(emp => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onDelete={() => handleDelete(emp.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
