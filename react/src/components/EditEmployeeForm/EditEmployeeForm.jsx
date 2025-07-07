import React from 'react';
import styles from './EditEmployeeForm.module.css';

const EditEmployeeForm = ({ name, salary, age, onNameChange, onSalaryChange, onAgeChange, onSave, onCancel, isLoading }) => (
  <div className={styles.detailsPanel}>
    <h2>Edit Employee (Mock)</h2>
    {isLoading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120, width: '100%' }}>
        <div className="spinner" />
      </div>
    ) : (
      <form onSubmit={onSave}>
        <label className={styles.editFormLabel}>Name: <input className={styles.editFormInput} value={name} onChange={e => onNameChange(e.target.value)} /></label><br />
        <label className={styles.editFormLabel}>Salary: <input className={styles.editFormInput} value={salary} onChange={e => onSalaryChange(e.target.value)} /></label><br />
        <label className={styles.editFormLabel}>Age: <input className={styles.editFormInput} value={age} onChange={e => onAgeChange(e.target.value)} /></label><br />
        <button type="submit" className={styles.editFormButton}>Save</button>
        <button type="button" className={`${styles.editFormButton} ${styles.cancelButton}`} onClick={onCancel}>Cancel</button>
      </form>
    )}
  </div>
);

export default EditEmployeeForm; 