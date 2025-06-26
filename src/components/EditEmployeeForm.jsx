import React from 'react';
import '../App.css';

const EditEmployeeForm = ({ name, salary, age, onNameChange, onSalaryChange, onAgeChange, onSave, onCancel }) => (
  <div className="details-panel">
    <h2>Edit Employee (Mock)</h2>
    <form onSubmit={onSave} className="edit-form">
      <label>Name: <input value={name} onChange={e => onNameChange(e.target.value)} /></label><br />
      <label>Salary: <input value={salary} onChange={e => onSalaryChange(e.target.value)} /></label><br />
      <label>Age: <input value={age} onChange={e => onAgeChange(e.target.value)} /></label><br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
    </form>
  </div>
);

export default EditEmployeeForm; 