import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from '../model/Bot';

const BotListEntry = ({ bot }: { bot: Bot }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/bots/${bot.id}`);
    };

    return (
        <li onClick={handleClick} className="max-w-md bg-none text-white text-start cursor-pointer truncate  py-4 px-2">
            <h3>{bot.name}</h3>
        </li>
    );
};

export default BotListEntry;