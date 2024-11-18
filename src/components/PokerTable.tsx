import { PlayerObj } from '../model/PlayerObj';
import Player from './Player';
import Board from './Board';
import Chips from './Chips';
import Filters from './Filters';

const PokerTable = (
  { communityCards, players, pot, round, activePlayerIdx } :
  { communityCards: string[], players: PlayerObj[], pot: number, round: string, activePlayerIdx: number }
) => {
  return (
    <svg width="1000" height="500">
      <Filters />
      <rect x="0" y="0" width="1000" height="500" fill="green" rx="20" />
      <text x={500} y={30} style={{pointerEvents: 'none'}} textAnchor='middle'>{round}</text>
      <Board x={500} y={50} cards={communityCards} />
      <Chips x={400} y={390} text="Pot" chips={pot} />

      <Player x={25} y={230} player={players[0]} isActive={activePlayerIdx === 0} />
      <Player x={815} y={230} player={players[1]} isActive={activePlayerIdx === 1} />
    </svg>
  );
};

export default PokerTable;
