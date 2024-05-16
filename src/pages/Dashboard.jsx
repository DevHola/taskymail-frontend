// src/pages/Dashboard.jsx

import React, { useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Nav from './Nav';
import WelcomeMessage from './Welcome';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMails } from '../slices/mailSlice';
import { fetchUser } from '../slices/Authslice';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { mails, unreadCount, loading: mailLoading } = useSelector((state) => state.mail);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchMails());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [authLoading, user, navigate]);

  if (authLoading || mailLoading || !user) {
    return <Skeleton />;
  }

  return (
    <>
      <Nav />
      <WelcomeMessage />
    </>
  );
}

export default Dashboard;
