import React from 'react';
import BotList from './BotList';
import GameList from './GameList';
import Header from './Header';

function HomePage() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow">
                <div className="w-1/2 overflow-auto flex-none">
                    <GameList />
                </div>
                <div className="w-1/2 overflow-auto flex-none">
                    <BotList />
                </div>
            </div>
        </div>
    );
}

export default HomePage;