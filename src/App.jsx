import React, { useState } from 'react';
import './App.css';
import EmployeeCard from './components/EmployeeCard';
import SearchBar from './components/SearchBar';
import SectionTag from './components/SectionTag';
import EmployeeDetails from './components/EmployeeDetails';
import EditEmployeeForm from './components/EditEmployeeForm';
import toast, { Toaster } from 'react-hot-toast';
import { useEmployeeContext } from './context/EmployeeContext';

const App = () => {
  const {
    employees,
    setEmployees,
    loading,
    error,
    deleteEmployee,
    editEmployee,
  } = useEmployeeContext();

  const [searchId, setSearchId] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [selected, setSelected] = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [editAge, setEditAge] = useState('');

  React.useEffect(() => {
    setFiltered(employees);
  }, [employees]);

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
    deleteEmployee(id);
    toast.success('Employee deleted!');
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
    editEmployee(updated);
    setEditEmp(null);
  };

  const handleCardClick = (emp) => {
    setSelected(emp);
    setEditEmp(null);
  };

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
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
        <EmployeeDetails employee={selected} />
      )}
      {editEmp && (
        <EditEmployeeForm
          name={editName}
          salary={editSalary}
          age={editAge}
          onNameChange={setEditName}
          onSalaryChange={setEditSalary}
          onAgeChange={setEditAge}
          onSave={handleEditSave}
          onCancel={() => setEditEmp(null)}
        />
      )}
    </div>
  );
};

export default App;
