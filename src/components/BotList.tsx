import React from 'react';
import BotListEntry from './BotListEntry';
import { useAppContext } from '../model/AppContext';
import { useNavigate } from 'react-router-dom';

const BotList = ({ creatable = true, width = 'auto' }: { creatable?: boolean, width?: string }) => {
    const { bots } = useAppContext();
    const navigate = useNavigate();

    const createNewBot = () => {
        navigate('/bots/create');
    };

    return (
        <div className={`w-${width} mx-4`}>
            <div className="flex justify-between items-center content-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Your Bots</h2>
                </div>
                {creatable && <button onClick={createNewBot} className="mb-4 bg-blue-500 text-white rounded px-2 py-1">Create New Bot</button>}
            </div>
            {bots.length > 0 && <ul className="divide-y divide-darkgrey-200">
                {bots.map((bot) => <BotListEntry key={bot.id} bot={bot} />)}
            </ul>}
            {bots.length === 0 && <p>You have not created any bots.</p>}
        </div>
    );
};

export default BotList;