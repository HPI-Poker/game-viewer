import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../model/AppContext';
import { Bot } from '../model/Bot';
import { Game } from '../model/Game';

function    CreateGame() {
    const { bots, games, setGames } = useAppContext();
    const [bot1, setBot1] = useState<Bot | null>(null);
    const [bot2, setBot2] = useState<Bot | null>(null);
    const [warning, setWarning] = useState('');
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (bot1 && bot2) {
            const newGame = new Game("42", bot1, bot2);
            setGames([...games, newGame]);
            navigate('/');
        }
    };

    const handleBotChange = (event: React.ChangeEvent<HTMLSelectElement>, setBot: React.Dispatch<React.SetStateAction<Bot | null>>) => {
        const botId = event.target.value;
        const bot = bots.find(bot => bot.id === botId) || null;
        setBot(bot);

        if (bot1 && bot1.isPredefined && bot2 && bot2.isPredefined) {
            setWarning('You have selected two predefined bots. This will show a cached result that has been precomputed.');
        } else {
            setWarning('');
        }
    };

    if (bots.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 p-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Create a New Game</h2>
                <p className="text-lg text-center">To start a new game you first need to create bots.</p>
                <p className="text-lg text-center">You have no bots available. Please go to the bot creation page to create a bot.</p>
                <button onClick={() => navigate('/bots/create')} className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300">Create a Bot</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 border border-white rounded p-4 mx-auto max-w-xl">
            <h2 className="text-4xl font-bold mb-6">Create a New Game</h2>
            <p className="text-lg text-center">Start a game between two bots.</p>
            <p className="text-lg text-center">You can create your own bot <span onClick={() => navigate('/bots/create')} className="text-blue-500 hover:text-blue-700 underline cursor-pointer">here</span>.</p>
            <label className="block">
                <span className="text-lg me-2">Bot 1:</span>
                <select onChange={event => handleBotChange(event, setBot1)} className="mt-1 w-64 py-2 rounded-md border-gray-300 shadow-sm  text-black">
                    <option value="">Select a bot</option>
                    {bots.map(bot => <option key={bot.id} value={bot.id}>{bot.name}</option>)}
                </select>
            </label>
            <label className="block">
                <span className="text-lg me-2">Bot 2:</span>
                <select onChange={event => handleBotChange(event, setBot2)} className="mt-1 w-64 py-2 rounded-md border-gray-300 shadow-sm text-black">
                    <option value="">Select a bot</option>
                    {bots.map(bot => <option key={bot.id} value={bot.id}>{bot.name}</option>)}
                </select>
            </label>
            {warning && <p className="text-yellow-500">{warning}</p>}
            <button disabled={!bot1 || !bot2    } type="submit" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300">Create Game</button>
        </form>
    );
}

export default CreateGame;