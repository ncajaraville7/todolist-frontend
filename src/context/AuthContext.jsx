import { useState, useEffect, createContext } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const authenticateUser = async () => {
    const token = localStorage.getItem('userToken');

    const url = 'http://localhost:4000/api/users/profile';

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

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
