import React from 'react';
import { PlayerObj } from '../model/PlayerObj';
import Card from './Card';
import Chips from './Chips';

const Player = ({ player, isActive, x, y }: { player: PlayerObj, isActive: boolean, x: number, y: number }) => {
  if (player) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        {isActive && <polygon transform="translate(60, 0) scale(2)" points="0,10 -4,0 4,0" fill="white" />}


        {player.bet > 0 && <Chips chips={player.bet} text="Bet" x={10} y={80} />}
        <Chips chips={player.stack} text="Chips" x={10} y={150} />
        <Card card={player.hand[0]} idx={0} x={0} y={200} isFolded={player.hasFolded} />
        <Card card={player.hand[1]} idx={1} x={0} y={200} isFolded={player.hasFolded} />

        <text x="30" y="350" fontSize="14" fill="white" fontStyle="italic">
          {player.text}
        </text>
      </g>
    );
  } else {
    return null;
  }
};

export default Player;
