import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';

import { AuthContext } from '../context/AuthContext';

const TasksLayout = () => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  return (
    <>{userData._id || userData.token ? <Outlet /> : <Navigate to="/" />}</>
  );
};

export default TasksLayout;
