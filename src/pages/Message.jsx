import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../slices/Authslice';
import { fetchMails, updateMailStatus } from '../slices/mailSlice';
import Nav from './Nav';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Message() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { mails, unreadCount, loading: mailsLoading } = useSelector((state) => state.mail);
  
  const mail = mails.find((mail) => mail._id === id);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchMails());
  }, [dispatch]);

  useEffect(() => {
    if (!user && !userLoading) {
      navigate('/');
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    if (mail && !mail.isRead) {
      dispatch(updateMailStatus(mail._id));
    }
  }, [mail, dispatch]);

  return (
    <>
      <Nav />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <h3 className='text-center py-4'>View Mail</h3>
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          { userLoading || mailsLoading ? <Skeleton count={5}/> :
          <>
          <div className="card-body">
            <h5 className="card-title">{mail.subject}</h5>
            <p className="card-text text-justify">{mail.content}</p>
          </div>
          </>

          }
        </div>
      </div>
    </>
  );
}

export default Message;
