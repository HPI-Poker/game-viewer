import React from 'react';
import Header from './Header';
import BotList from './BotList';
import BotCreator from './BotCreator';

function CreateBotPage() {

    return (
        <div>
            <Header />
            <div className="flex justify-between m-2 rounded border-white">
                <div className="flex-grow">
                    <BotCreator />
                </div>
                <div className="ml-4 w-32">
                    <BotList creatable={false}/>
                </div>
            </div>
        </div>
    );
}

export default CreateBotPage;