import { useState, createContext } from 'react';

import axios from 'axios';

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);
  const [alert, setAlert] = useState({});
  const [taskEdit, setTaskEdit] = useState({});

  const submitTask = async () => {
    const token = localStorage.getItem('userToken');
    const url = 'http://localhost:4000/api/tasks/';

    if (!task) {
      setAlert({
        message: 'No ingresaste ninguna tarea',
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);

      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(url, { task }, config);
      setAlert({
        message: response.data.msg,
        error: false,
      });
      setTasksList([response.data.task, ...tasksList]);
      setTask('');
      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    const token = localStorage.getItem('userToken');
    const url = 'http://localhost:4000/api/tasks/';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(url, config);
    setTasksList(response.data);
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('userToken');
    const url = `http://localhost:4000/api/tasks/${id}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.delete(url, config);
      const deleteTask = tasksList.filter((task) => task._id !== id);
      setTasksList(deleteTask);
      setAlert({ message: response.data.msg, error: false });
      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id) => {
    const token = localStorage.getItem('userToken');
    const url = `http://localhost:4000/api/tasks/${id}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(url, {}, config);
      setAlert({
        message: response.data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);

      const completed = tasksList.map((item) => {
        if (id === item._id) {
          item.status = !item.status;
          return item;
        }
        return item;
      });
      setTasksList(completed);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (objTask) => {
    setTask(objTask.task);
    setTaskEdit(objTask);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskEdit._id) {
      const token = localStorage.getItem('userToken');
      const url = `http://localhost:4000/api/tasks/${taskEdit._id}`;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.put(url, { task }, config);
        setAlert({ message: response.data.msg, error: false });
        const taskUpdate = tasksList.map((taskState) =>
          taskState._id === taskEdit._id ? response.data.task : taskState
        );

        setTasksList(taskUpdate);
        setTask('');
        setTaskEdit({});
        setTimeout(() => {
          setAlert({});
        }, 2000);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    submitTask();
  };

  return (
    <TaskContext.Provider
      value={{
        task,
        setTask,
        tasksList,
        setTasksList,
        alert,
        taskEdit,
        setTaskEdit,
        submitTask,
        getTasks,
        deleteTask,
        completeTask,
        editTask,
        handleSubmit,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
