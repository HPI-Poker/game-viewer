import React from 'react';
import PlayerMatrix, { EResult } from '../model/PlayerMatrix';
import '../styles/Leaderboard.css';

const Leaderboard = ({ playerMatrix }: { playerMatrix: PlayerMatrix }) => {
  const players = playerMatrix.getPlayers();
  const results = players.map(player => {
    const games = playerMatrix.getGames(player);
    const wins = games.filter(game => game.result === player).length;
    const losses = games.filter(game => game.result !== EResult.unknown && game.result !== player).length;
    const draws = games.filter(game => game.result === EResult.draw).length;
    const bankroll = games.reduce((total, game) => total + game.amountWon * (game.result === player ? 1 : -1), 0);

    return { player, wins, losses, draws, bankroll };
  });

  // sort by wins, then bankroll
  results.sort((a, b) => a.wins === b.wins ? b.bankroll - a.bankroll : b.wins - a.wins);

  return <div>
    <h2>Leaderboard</h2>
    <table className='leaderboard-table'>
      <thead>
        <tr>
          <th className='leaderboard-row'>Player</th>
          <th className='leaderboard-row'>W</th>
          <th className='leaderboard-row'>D</th>
          <th className='leaderboard-row'>L</th>
          <th className='leaderboard-row'>Bankroll</th>
        </tr>
      </thead>
        <tbody>
          {results.map(({ player, wins, losses, draws, bankroll }) => (
            <tr key={player}>
              <td className='leaderboard-row'>{player}</td>
              <td className='leaderboard-row'>{wins}</td>
              <td className='leaderboard-row'>{draws}</td>
              <td className='leaderboard-row'>{losses}</td>
              <td className='leaderboard-row'>{bankroll}</td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>;
};

export default Leaderboard;