import Header from './Header';
import GameList from './GameList';
import GameCreator from './GameCreator';

function CreateGamePage() {
    return (
        <div>
            <Header />
            <div className="flex justify-between m-2 rounded border-white">
                <div className="flex-grow">
                    <GameCreator />
                </div>
                <div className="ml-4">
                    <GameList creatable={false} width='32' />
                </div>
            </div>
        </div>
    );
}

export default CreateGamePage;