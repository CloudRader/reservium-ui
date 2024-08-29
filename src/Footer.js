import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-green-50 to-green-100 shadow-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-green-800">Buben Club</span>
                        {/*//TODO add logo*/}
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="mb-4 md:mb-0">
                            <h3 className="font-semibold text-green-800 mb-2">Help</h3>
                            <ul className="space-y-1">
                                <li>
                                    <Link to="/wiki" className="text-green-600 hover:text-green-800">How to become a member</Link>
                                {/*https://wiki.buk.cvut.cz/en/for-members/faq*/}
                                </li><li>
                                    <Link to="/wiki" className="text-green-600 hover:text-green-800">Wiki</Link>
                                {/*https://wiki.buk.cvut.cz/cs/home*/}
                                </li>
                                <li>
                                    <Link to="/faq" className="text-green-600 hover:text-green-800">FAQ</Link>
                                {/*  https://wiki.buk.cvut.cz/cs/for-members/faq  */}
                                </li>
                                <li>
                                    {/*<Link to="/about-reservation" className="text-green-600 hover:text-green-800">About*/}
                                    {/*    Reservation</Link>*/}
                                    <a href="https://wiki.buk.cvut.cz/cs/club-zone/club-room" target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-green-600 hover:text-green-800">Instagram</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-green-800 mb-2">Our social networks</h3>
                            <ul className="space-y-1">
                                <li>
                                    <a href="https://www.instagram.com/bubenklub/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">Instagram</a>
                                </li>
                                <li> https://discord.gg/eae5fAsz
                                    <a href="https://discord.gg/cwb8mRD3Qg" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">Discord</a>
                                </li>
                                <li>
                                    <a href="https://t.me/+7HvQ_-rPlSxlZDcy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">Telegram</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;