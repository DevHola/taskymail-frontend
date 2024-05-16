// src/App.jsx
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './pages/Login';
import Inbox from './pages/Inbox';
import Message from './pages/Message';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './slices/Authslice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
