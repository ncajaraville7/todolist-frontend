import { useState, useEffect } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import Alert from '../components/Alert';
import { AnimatePresence } from 'framer-motion';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:4000/api/users/register';

    if (!name || !email || !password || !repassword) {
      setAlert({
        message: 'Todos los campos deben estar completos',
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }

    axios
      .post(url, { name, email, password, repassword })
      .then((response) => {
        setAlert({
          message: response.data.msg,
          error: false,
        });

        setTimeout(() => {
          setAlert({});
        }, 2000);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data.msg,
          error: true,
        });

        setTimeout(() => {
          setAlert({});
        }, 2000);
      });

    setName('');
    setEmail('');
    setPassword('');
    setRePassword('');
  };

  return (
    <>
      <h1 className="text-4xl text-center font-black">
        TODO-LIST <br />
        <span className="text-orange-500">FULLSTACK</span>
      </h1>

      <p className="m-2 text-gray-400 text-center">
        Complete el formulario para registrarse
      </p>

      <form className="shadow-md rounded-md p-5 mt-5" onSubmit={handleSubmit}>
        <AnimatePresence>
          {alert.message && <Alert alert={alert} />}
        </AnimatePresence>

        <div className="flex flex-col">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 border p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 border p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 border p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="repassword">Repetir Contraseña</label>
          <input
            type="password"
            id="repassword"
            placeholder="Repita su contraseña"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="mt-2 border p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex gap-4 justify-center mt-5">
          <input
            type="submit"
            value="Registrarse"
            className="w-full text-center bg-orange-500 py-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-orange-600 transition-colors"
          />

          <Link
            to="/"
            className="w-full text-center bg-orange-500 py-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-orange-600 transition-colors"
          >
            Ya tengo una cuenta
          </Link>
        </div>
      </form>
    </>
  );
};

export default UserRegister;
