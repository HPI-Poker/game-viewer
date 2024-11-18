import React from "react";
import "../styles/MatchupTable.css";
import PlayerMatrix, { EResult, Result } from "../model/PlayerMatrix";

const convertResultToString = (result: Result) => {
    switch (result) {
        case EResult.draw:
            return "Draw";
        case EResult.error:
            return "Error";
        case EResult.unknown:
            return "?";
        default:
            return result;
    }
};

const MatchupTable = ({ playerMatrix, setSelectedPlayers, loadGameResult }: { playerMatrix: PlayerMatrix , setSelectedPlayers: (p1: string, p2: string) => any, loadGameResult: (p1: string, p2: string) => any }) => {
    const sortedPlayers = playerMatrix!.getPlayers();


    const loadAllGames = () => {
        const allPlayers = playerMatrix.getPlayers();
        allPlayers.forEach(player1 => allPlayers.forEach(player2 => loadGameResult(player1, player2)));
    };

    const generateMatrix = () => {
        return (
            <table className="matchup-matrix">
                <thead>
                    <tr>
                        <th>
                            <button onClick={loadAllGames}>Reveal All</button>
                        </th>
                        {sortedPlayers.map((player) => (
                            <th key={player} className="fat-name">{player}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedPlayers.map((player1) => (
                        <tr key={player1}>
                            <td className="fat-name">{player1}</td>
                            {sortedPlayers.map((player2) => (
                                <td
                                    key={`${player1}-${player2}`}
                                    onClick={() => setSelectedPlayers(player1, player2)}
                                >
                                    <span className="cell-content clickable">
                                        {convertResultToString(playerMatrix.getResult(player1, player2).result)}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <h2>All Match-ups</h2>
            {generateMatrix()}
        </div>
    );
};

export default MatchupTable;