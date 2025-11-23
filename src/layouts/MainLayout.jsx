import React from 'react';
import Header from '../widgets/Header/Header.jsx';
import Footer from '../widgets/Footer/Footer.jsx';

const MainLayout = ({
  children,
  isLoggedIn,
  username,
  services,
  isManager,
  showFooter = true,
}) => {
  return (
    <div className="dark:!bg-slate-400">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        services={services}
        isManager={isManager}
      />
      {children}
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
