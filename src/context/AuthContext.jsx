import { useState, useEffect, createContext, useContext } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { TaskContext } from './TaskContext';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const { setTasksList, getTasks } = useContext(TaskContext);

  const navigate = useNavigate();

  const authenticateUser = async () => {
    const token = localStorage.getItem('userToken');

    const url =
      'https://todo-list-backend-production.up.railway.app/api/users/profile';

    if (!token) {
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      setUserData(response.data);
      navigate('/tasks');
    } catch (error) {
      setUserData({});
    }

    setLoading(false);
  };

  const singOut = () => {
    localStorage.removeItem('userToken');
    navigate('/');
    setTasksList([]);
    setUserData({});
  };

  // LLAMAMOS A getTasks PARA ESCUCHAR POR LO CAMBIOS EN USERDATA
  useEffect(() => {
    getTasks();
  }, [userData]);

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
