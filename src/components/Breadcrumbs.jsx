import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import '../App.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams();
  const { employees } = useEmployeeContext();

  let crumbs = [<Link key="home" to="/">Home</Link>];

  if (location.pathname.startsWith('/employee/') && params.id) {
    const employee = employees.find(emp => String(emp.id) === params.id);
    const name = employee ? employee.employee_name : params.id;
    if (location.pathname.endsWith('/edit')) {
      crumbs.push(<span key="edit"> &gt;&gt; edit &gt;&gt; {name}</span>);
    } else {
      crumbs.push(<span key="view"> &gt;&gt; view &gt;&gt; {name}</span>);
    }
  }

  return (
    <div className="breadcrumbs">
      {crumbs}
    </div>
  );
};

export default Breadcrumbs; 