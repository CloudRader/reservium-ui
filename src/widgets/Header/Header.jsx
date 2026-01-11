import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// import ThemeToggle from "./ThemeToggle";
import HeaderNavigation from './HeaderNavigation.jsx';

const Header = ({ username, isLoggedIn, services, isManager }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isViewMode = location.pathname.startsWith('/view');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-gradient-to-r from-green-50 to-green-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16 text-green-800">
          <HeaderNavigation
            services={services}
            showServices={isLoggedIn || isViewMode}
            isViewMode={isViewMode}
          />
          {!isViewMode && (
            <>
              <div className="hidden sm:flex sm:items-center space-x-4">
                {/*<ThemeToggle />*/}
                {isLoggedIn ? (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="flex items-center space-x-2 text-sm font-medium text-green-700 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-3 py-2 transition duration-150 ease-in-out">
                        <span>{username}</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[9rem] bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
                        sideOffset={5}
                        align="end"
                      >
                        <DropdownMenu.Item asChild>
                          <NavLink
                            to="/events"
                            className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50 focus:bg-green-50 outline-none cursor-pointer transition duration-150 ease-in-out"
                          >
                            My Events
                          </NavLink>
                        </DropdownMenu.Item>

                        {isManager && (
                          <DropdownMenu.Item asChild>
                            <NavLink
                              to="manager/manager-panel"
                              className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50 focus:bg-green-50 outline-none cursor-pointer transition duration-150 ease-in-out"
                            >
                              Manager panel
                            </NavLink>
                          </DropdownMenu.Item>
                        )}

                        <DropdownMenu.Item asChild>
                          <NavLink
                            to="/logout"
                            className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50 focus:bg-green-50 outline-none cursor-pointer transition duration-150 ease-in-out"
                          >
                            Log out
                          </NavLink>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                ) : (
                  <NavLink
                    to="/login"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    Log in
                  </NavLink>
                )}
              </div>
              <div className="sm:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Toggle mobile menu"
                  className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-green-900 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </>
          )}
        </nav>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="sm:hidden bg-green-50 rounded-md shadow-md mt-2 p-4"
          >
            <div className="space-y-2">
              {services.map((item) => (
                <NavLink
                  key={item.linkName}
                  to={item.linkName}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-green-200 text-green-900'
                        : 'text-green-700 hover:bg-green-100 hover:text-green-900'
                    } transition duration-150 ease-in-out`
                  }
                >
                  {item.serviceName}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <span className="block text-sm font-medium text-green-700">
                    {username}
                  </span>
                  <NavLink
                    to="/events"
                    className="block w-full text-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    My Events
                  </NavLink>
                  {isManager && (
                    <NavLink
                      to="manager/manager-panel"
                      className="block w-full text-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                    >
                      Manager panel
                    </NavLink>
                  )}
                  <NavLink
                    to="/logout"
                    className="block w-full text-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    Log out
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="block w-full text-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Log in
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
