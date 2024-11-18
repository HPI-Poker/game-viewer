import React from 'react';
import { useAppContext } from '../model/AppContext';
import GameListEntry from './GameListEntry';
import { useNavigate } from 'react-router-dom';

function GameList({ creatable = true, width = 'auto' }: { creatable?: boolean, width?: string }) {
    const { games } = useAppContext();
    const navigate = useNavigate();

    const createNewGame = () => {
        navigate('/games/create');
    };

    return (
        <div className={`w-${width} mx-4`}>
            <div className="flex justify-between items-center content-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Your Games</h2>
                </div>
                {creatable && <button onClick={createNewGame} className="mb-4 bg-blue-500 text-white rounded px-2 py-1">Create New Game</button>}
            </div>
            {games.length > 0 && <ul className="divide-y divide-gray-200">
                {games.map((game) => <GameListEntry key={game.id} game={game} />)}
            </ul>}
            {games.length === 0 && <p>You have not started any games.</p>}
        </div>
    );
}

export default GameList;