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
    <div className="flex flex-col min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        services={services}
        isManager={isManager}
      />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
