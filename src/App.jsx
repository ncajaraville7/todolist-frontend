import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthContextProvider from './context/AuthContext';

import AuthLayout from './Layout/AuthLayout';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import TasksLayout from './Layout/TasksLayout';
import TasksList from './pages/TasksList';
import TaskContextProvider from './context/TaskContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="/register" element={<UserRegister />} />
            </Route>

            <Route path="/tasks" element={<TasksLayout />}>
              <Route index element={<TasksList />} />
            </Route>
          </Routes>
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
