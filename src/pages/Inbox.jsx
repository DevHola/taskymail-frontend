import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser } from '../slices/Authslice';
import { fetchMails } from '../slices/mailSlice';
import Nav from './Nav';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Inbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { mails, unreadCount, loading: mailsLoading } = useSelector((state) => state.mail);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchMails());
  }, [dispatch]);

  useEffect(() => {
    if (!user && !userLoading) {
      navigate('/');
    }
  }, [user, userLoading, navigate]);

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

 

  return (
    <>
      <Nav />
      <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <h3 className='text-center py-4'>Inbox</h3>
        <Link to="/inbox" className="btn btn-primary text-center" data-mdb-ripple-init>Compose a message</Link>
      </div>
      {
        userLoading || mailsLoading ? <Skeleton count={5}/> : <> 
        {mails.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No emails found.</p>
      ) : (
        <ul className="list-group mx-auto" style={{ maxWidth: '700px' }}>
          {mails.map(email => (
            <li key={email._id} className="list-group-item">
              <strong>
                <Link to={`/message/${email._id}`} style={{ color: email.isRead ? "black" : "#3b71ca" }}>
                  {email.subject}
                </Link>
              </strong>
              <p>{truncateContent(email.content, 10)}</p>
            </li>
          ))}
        </ul>
      )}
        </>
      }
    </>
  );
}
<>
      

    </>

export default Inbox;
