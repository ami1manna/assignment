import { useState, useEffect, useCallback } from 'react';

export default function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(import.meta.env.VITE_EMPLOYEE_API_URL);
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

  const editEmployee = (updated) => {
    setEmployees(prev => prev.map(emp => emp.id === updated.id ? updated : emp));
  };

  return {
    employees,
    setEmployees, // for search filtering
    loading,
    error,
    fetchEmployees,
    deleteEmployee,
    editEmployee,
  };
} 