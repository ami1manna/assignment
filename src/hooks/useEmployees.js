import { useState, useEffect, useCallback } from 'react';

export default function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("fetching employees");
      const res = await fetch(import.meta.env.VITE_EMPLOYEE_API_URL || 'https://dummy.restapiexample.com/api/v1/employees');
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
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // Bulk delete
  const deleteEmployees = (ids) => {
    setEmployees(prev => prev.filter(emp => !ids.includes(emp.id)));
  };

  const editEmployee = (updated) => {
    setEmployees(prev => prev.map(emp => emp.id === updated.id ? updated : emp));
  };

  const searchEmployees = (id) => {
    if (!id.trim()) return { results: employees, error: '' };
    const found = employees.filter(emp => String(emp.id) === id.trim());
    if (found.length === 0) {
      return { results: [], error: 'No employee found with that ID.' };
    }
    return { results: found, error: '' };
  };

  return {
    employees,
    setEmployees, // for search filtering
    loading,
    error,
    fetchEmployees,
    deleteEmployee,
    deleteEmployees, // bulk delete
    editEmployee,
    searchEmployees,
  };
} 