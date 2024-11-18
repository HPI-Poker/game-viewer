import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../model/AppContext";
import { useNavigate } from "react-router-dom";
import SimulatedPokerTable from "./SimulatedPokerTable";
import Header from "./Header";

const GamePage = () => {
    const { id } = useParams();
    const { games } = useAppContext();
    const navigate = useNavigate();

    const handleClose = () => navigate('/');

    const game = games.find((game) => game.id === id);

    if (game) {
        if (game.status === 'done') {
            const log = game.log;
            const summary = game.summary;

            if (log && summary) {
                return <SimulatedPokerTable log={log} summary={summary} close={handleClose} />;
            } else {
                return <div className="p-4">
                    <Header />
                    <h2 className="text-4xl font-bold mb-6">Something got lost</h2>
                    <p className="text-lg">Game is finished, but we could not found a game log or a summary.</p>
                </div>;
            }
        } else if (game.status === 'ongoing') {
            return <div className="p-4">
                <Header />
                <h2 className="text-4xl font-bold mb-6">Game in progress</h2>
                <p className="text-lg">Game is currently in progress.</p>
            </div>;
        } else if (game.status === 'waiting') {
            return <div className="p-4">
                <Header />
                <h2 className="text-4xl font-bold mb-6">Game Page</h2>
                <p className="text-lg">Game is waiting to be started...</p>
            </div>;
        } else if (game.status === 'canceled') {
            return <div className="p-4">
                <Header />
                <h2 className="text-4xl font-bold mb-6">Game Page</h2>
                <p className="text-lg">Game is waiting to be started...</p>
            </div>;
        } else {
            return <div className="p-4">
                <Header />
                <h2 className="text-4xl font-bold mb-6">Something went wrong</h2>
                <p className="text-lg">It seems like something went wrong while starting this game.</p>
            </div>;
        }
    } else {
        return <div className="p-4">
            <Header />
            <h2 className="text-4xl font-bold mb-6">Game not found</h2>
            <p className="text-lg">Could not find the game you were looking for...</p>
        </div>;
    }
};

export default GamePage;