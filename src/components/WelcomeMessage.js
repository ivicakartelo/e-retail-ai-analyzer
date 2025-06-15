import React from 'react';
import { useSelector } from 'react-redux';

const WelcomeMessage = () => {
  const user = useSelector((state) => state?.login?.user);
  const error = useSelector((state) => state?.login?.error);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {user ? (
        <span
          style={{
            color: 'white', // White font color
            padding: '4px',
          }}
        >
          Welcome, {user.name}!
        </span>
      ) : (
        'Please log in.'
      )}
    </div>
  );
};

export default WelcomeMessage;