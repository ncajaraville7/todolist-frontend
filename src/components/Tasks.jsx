import { useContext } from 'react';

import { formatDate } from '../helpers/formatDate';

import { TaskContext } from '../context/TaskContext';

import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

import { motion } from 'framer-motion';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Tasks = ({ tasks }) => {
  const { editTask, completeTask, deleteTask } = useContext(TaskContext);
  return (
    <div className="flex justify-center mt-4">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        layoutId={tasks._id}
        className="mt-4 border p-4 ml-4 mr-6 flex justify-between items-center max-w-3xl gap-9"
      >
        <div className="flex flex-col">
          <h2 className="font-bold">{tasks.task}</h2>
          <p className="text-gray-500">{formatDate(tasks.createdAt)}</p>
        </div>
        <div className="flex items-center">
          <button
            className="bg-orange-500 p-2 rounded-sm mr-4 uppercase text-white font-black flex items-center gap-2"
            onClick={() => editTask(tasks)}
          >
            <FaEdit />
            Editar
          </button>
          <button
            className="bg-green-500 p-2 rounded-sm mr-4 uppercase text-white font-black"
            onClick={() => completeTask(tasks._id)}
          >
            {tasks.status ? 'COMPLETA' : 'INCOMPLETA'}
          </button>
          <button
            type="button"
            className="bg-red-500 p-2 rounded-sm mr-4 uppercase text-white font-black flex items-center gap-2"
            onClick={() => deleteTask(tasks._id)}
          >
            <FaTrashAlt />
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Tasks;
