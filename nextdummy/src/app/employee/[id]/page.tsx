'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styles from '../../../modules/employee/styles/EmployeeDetail.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { useRouter } from 'next/navigation';

interface EmployeeDetailPageProps {
  params: Promise<{ id: string }>;
}

const EmployeeDetailPage = ({ params }: EmployeeDetailPageProps) => {
  const router = useRouter();
  const { employees } = useAppSelector((state) => state.employee);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployeeId = async () => {
      const { id } = await params;
      setEmployeeId(Number(id));
      setLoading(false);
    };

    loadEmployeeId();
  }, [params]);

  const employee = useMemo(() => {
    if (!employeeId) return null;
    return employees.find(emp => emp.id === employeeId) || null;
  }, [employees, employeeId]);

  useEffect(() => {
    if (!loading && !employee && employeeId) {
      // If employee not found in Redux, redirect back to list
      router.push('/');
    }
  }, [employee, loading, employeeId, router]);

  const handleBack = () => {
    router.push('/');
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!employee) return <div className={styles.notFound}>Employee not found.</div>;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={styles.employeeDetail}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBack}>
          ←
        </button>
        
        <div className={styles.avatar}>
          {getInitials(employee.employee_name)}
        </div>
        
        <h1 className={styles.title}>{employee.employee_name}</h1>
        
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <span className={styles.infoLabel}>Age:</span>
            <span className={styles.infoValue}>{employee.employee_age} years</span>
          </div>
          <div className={styles.info}>
            <span className={styles.infoLabel}>Salary:</span>
            <span className={styles.infoValue}>${employee.employee_salary.toLocaleString()}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.infoLabel}>ID:</span>
            <span className={styles.infoValue}>#{employee.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage; 