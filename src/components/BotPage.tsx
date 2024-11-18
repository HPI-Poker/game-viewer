import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../model/AppContext';
import Header from './Header';

const BotPage = () => {
    const { id } = useParams<{ id: string }>();
    const { bots } = useAppContext();
    const bot = bots.find((bot) => bot.id === id);
    
    if (bot) {
        return (
            <div className="p-4">
                <Header />
                <div className="flex">
                    <h2 className="text-4xl font-bold mb-6">Bot {bot.name}</h2>
                </div>
                <p className="text-lg">This is the bot page. In the future you can start a game with this bot and see statistics and past games of it.</p>
            </div>
        );
    } else {
        return (
            <div className="p-4">
                <Header />
                <div className="flex">
                    <h2 className="text-4xl font-bold mb-6">Bot not found</h2>
                </div>
                <p className="text-lg">Could not find the bot you were looking for...</p>
            </div>
        );
    }
};

export default BotPage;