import './Header.css';
import LoginInfo from "./LoginInfo";
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
    // use the useLocation hook to get the current pathname
    const location = useLocation();
    const pathname = location.pathname;

    // use the pathname to determine the selected room
    const [selectedRoom, setSelectedRoom] = useState(null);
    useEffect(() => {
        if (pathname === '/study-room') {
            setSelectedRoom('Study Room');
        } else if (pathname === '/club-room') {
            setSelectedRoom('Club Room');
        } else if (pathname === '/grill') {
            setSelectedRoom('Grill');
        } else {
            setSelectedRoom(null);
        }
    }, [pathname]);

    // use a ref to store the header element
    const headerRef = useRef(null);

    // use the selectedRoom state to conditionally render the room name
    let roomName;
    if (selectedRoom) {
        roomName = (
            <div className="room-name" ref={headerRef}>
                {selectedRoom}
            </div>
        );
    } else {
        roomName = null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light header">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        to="/study-room"
                        className={({ isActive }) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Reserve a Study Room
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/club-room"
                        className={({ isActive }) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Reserve a Club Room
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/grill"
                        className={({ isActive }) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Reserve a Grill
                    </NavLink>
                </li>
            </ul>
            <div className="log-section">
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">Welcome, salam!</li>
                        <li className="nav-item">
                            <NavLink
                                to="/logout"
                                className={({ isActive }) =>
                                    isActive ? "nav-link selected selected-link" : "nav-link"
                                }
                            >
                                Log out
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        className={({isActive}) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Log in
                    </NavLink>
                )}
            </div>
        </nav>
    );


};

export default Header;
