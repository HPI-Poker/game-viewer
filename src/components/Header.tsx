import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleHome = () => navigate('/');

    return (
        <header className="p-4 text-white flex items-start">
            <h1 onClick={handleHome} className="text-2xl cursor-pointer">HPI Poker Bots 2024</h1>
        </header>
    );
}

export default Header;