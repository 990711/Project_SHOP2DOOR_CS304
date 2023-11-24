
import React from 'react';
import RegisterLeftSection from './RegisterLeftSection';
import RegisterRightSection from './RegisterRightSection';

const RegisterMainPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <RegisterLeftSection />
      <RegisterRightSection />
    </div>
  );
};

export default RegisterMainPage;
