import { useLocation } from 'react-router-dom';
import React from 'react';

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/*<h1>Hello, {user}</h1>*/}
      
      <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '20px', color: 'green', marginTop: '20px' }}>
        Welcome to Shop2Door
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
        {/* Image in the center */}
        <div style={{ margin: '20px' }}>
          <img
            src="/Shop owner 2.gif"
            alt="Shop Animation"
            style={{ display: 'block', margin: 'auto', width: '600px', height: '600px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
