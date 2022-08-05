import { useState, useContext } from 'react';

import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext.jsx';

import { AnimatePresence } from 'framer-motion';

import Alert from '../components/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState({});

  const navigate = useNavigate();

  const { setUserData } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:4000/api/users/login';

    if (!email || !password) {
      setAlert({
        message: 'Debes completar todos los campos',
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }

    try {
      const response = await axios.post(url, { email, password });
      localStorage.setItem('userToken', response.data.token);
      setUserData(response.data);
      navigate('/tasks');
    } catch (error) {
      setAlert({
        message: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-black">
        TODO-LIST <br />
        <span className="text-orange-500">FULLSTACK</span>
      </h1>

      <p className="m-2 text-gray-400 text-center">
        Complete el formulario para iniciar sesión
      </p>

      <form className="shadow-md rounded-md p-5 mt-5" onSubmit={handleSubmit}>
        <AnimatePresence>
          {alert.message && <Alert alert={alert} />}
        </AnimatePresence>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 border p-2 rounded-md outline-none"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 border p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <input
            type="submit"
            value="Iniciar Sesión"
            className="w-full text-center bg-orange-500 py-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-orange-600 transition-colors"
          />

          <Link
            to="/register"
            className="w-full text-center bg-orange-500 py-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-orange-600 transition-colors"
          >
            No tengo una cuenta
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
