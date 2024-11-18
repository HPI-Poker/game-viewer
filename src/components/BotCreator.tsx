import React, { useState } from 'react';
import { useAppContext } from '../model/AppContext';
import { useNavigate } from 'react-router-dom';

function BotCreator() {
    const [inputKey, setInputKey] = useState(Date.now());
    const [name, setName] = useState('');
    const [script, setScript] = useState('');
    const [warning, setWarning] = useState('');
    const { createBot, bots } = useAppContext();

    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setScript(e.target?.result as string);
            reader.readAsText(file);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !script) {
            setWarning('Name and script are required');
            return;
        }

        if (bots.find(bot => bot.name === name)) {
            setWarning('A bot with that name already exists');
            return;
        }

        createBot(name, script);
        
        setName('');
        setScript('');
        setInputKey(Date.now());
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}  className="space-y-6 text-lg border border-white rounded p-4 mx-auto max-w-xl">
                <h2 className="text-4xl font-bold mb-6">Create a New Bot</h2>
                <label className="flex justify-center items-center space-x-3">
                    <span>Name:</span>
                    <input className="mt-1 w-80 py-2 rounded-md border-gray-300 shadow-sm text-black" onChange={(evt) => setName(evt.target.value)} value={name} />
                </label>
                <label className="flex justify-center items-center space-x-3">
                    <span>Script:</span>
                    <input key={inputKey} type="file" accept=".py,.cpp,.java" className="mt-1 w-80 py-2 rounded-md border-gray-300 shadow-sm" onChange={handleFileChange} />
                </label>
                {warning && <p className="text-red-500">{warning}</p>}
                <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded">Create Bot</button>
            </form>
            <p className="text-lg text-center m-4">After creating a bot you can start a new game <span onClick={() => navigate('/games/create')} className="text-blue-500 hover:text-blue-700 underline cursor-pointer">here</span>.</p>
        </div>
    );
}

export default BotCreator;