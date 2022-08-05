import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';

import { FaUserAlt } from 'react-icons/fa';

import Alert from '../components/Alert';
import Tasks from '../components/Tasks';
import { AnimatePresence } from 'framer-motion';

const TasksList = () => {
  const { userData } = useContext(AuthContext);

  const {
    singOut,
    alert,
    submitTask,
    task,
    setTask,
    taskEdit,
    tasksList,
    handleSubmit,
  } = useContext(TaskContext);

  const { name } = userData;

  return (
    <main>
      <div className=" flex justify-between items-center ml-4 mr-4 md:flex-row flex-col">
        <h1 className="text-3xl text-center font-black text-orange-500">
          TODO-LIST FULLSTACK
        </h1>
        <div className="flex m-2">
          <p className="flex items-center gap-2">
            <FaUserAlt /> {name}
          </p>
          <button
            type="button"
            className="ml-4 text-gray-400 text-center "
            onClick={singOut}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <AnimatePresence>
        {alert.message && <Alert alert={alert} />}
      </AnimatePresence>
      <form
        className="mt-4 flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="border p-3 shadow w-2/5 flex justify-between items-center">
          <input
            type="text"
            placeholder="Agregar tarea"
            autoFocus
            className="outline-none w-11/12"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="submit"
            className="border-l-2 pl-2 cursor-pointer font-bold"
          >
            {taskEdit._id ? 'EDITAR' : '+'}
          </button>
        </div>
      </form>

      <div>
        {tasksList.length < 1 ? (
          <h2 className="text-center mt-5 font-black text-3xl uppercase text-gray-500">
            No hay tareas
          </h2>
        ) : (
          <AnimatePresence>
            {tasksList.map((task) => (
              <Tasks key={task._id} tasks={task} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
};

export default TasksList;
