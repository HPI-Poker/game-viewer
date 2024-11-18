import React from 'react';
import { Game } from '../model/Game';
import { useNavigate } from 'react-router-dom';

function GameListEntry({ game }: { game: Game }) {
    const navigate = useNavigate();

    const handleClick = () => navigate(`/games/${game.id}`);
    
    let statusText;
    switch (game.status) {
        case 'waiting':
            statusText = `Waiting to start`;
            break;
        case 'ongoing':
            statusText = `Ongoing...`;
            break;
        case 'done':
            statusText = `Done (Result: ${game.result?.winner.name} vs ${game.result?.loser.name})`;
            break;
        default:
            statusText = 'Unknown status';
            break;
    }

    return (
        <li onClick={handleClick} className="max-w-md bg-none text-white text-start cursor-pointer truncate">
            {game.getName()} - {statusText}
        </li>
    );
}

export default GameListEntry;