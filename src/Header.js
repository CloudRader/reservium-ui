import LoginInfo from "./LoginInfo";
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ReservationForm from "./ReservationForm";
import LoginButton from "./LoginButton";
import './Header.css';


const Header = ({ username,isLoggedIn, onLogout }) => {
    // use the useLocation hook to get the current pathname
    const location = useLocation();
    const pathname = location.pathname;

    // use the pathname to determine the selected room
    const [selectedRoom, setSelectedRoom] = useState(null); // todo Delete

    useEffect(() => { // TODO
        if (pathname === '/study-room') {
            setSelectedRoom('Study Room');
        } else if (pathname === '/club-room' || pathname === '/') {
            setSelectedRoom('Club Room');
        } else if (pathname === '/grill') {
            setSelectedRoom('Grill');
        } else {
            setSelectedRoom(null);
        }
    }, [pathname]);

    // use a ref to store the header element
    const headerRef = useRef(null);



    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light header">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        to="/club-room"
                        className={({isActive}) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Reserve a Club Room
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/study-room"
                        className={({isActive}) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Reserve a Study Room
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/grill"
                        className={({isActive}) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Reserve a Grill
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/create-new-calendar"
                        className={({isActive}) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Create Calendar
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to='/create-new-miniservice'
                        className={({isActive}) =>
                            isActive ? "nav-link selected selected-link" : "nav-link"
                        }
                    >
                        Create Mini Service
                    </NavLink>
                </li>
            </ul>
            <div className="log-section">
                {isLoggedIn ? (
                    <div className="logout">
                        <div className="text">Welcome, {username}</div>
                        <NavLink
                                to="/logout"
                                className={({isActive}) =>
                                    isActive ? "nav-link selected selected-link" : "nav-link"
                                }>
                            Log out
                        </NavLink>
                    </div>
                ) : (
                    <LoginButton />
                )}
            </div>
        </nav>
    );


};

export default Header;
