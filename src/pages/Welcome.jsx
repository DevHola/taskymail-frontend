import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function WelcomeMessage() {
  const { user } = useSelector((state) => state.auth);
  const { mails, unreadCount } = useSelector((state) => state.mail);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, {user.name}!</h2>
      <p>You have {unreadCount} unread mails out of {mails.length} totals.</p>
      <Link to="/inbox" className="btn btn-primary" data-mdb-ripple-init>View Messages</Link>
    </div>
  );
}

export default WelcomeMessage;
