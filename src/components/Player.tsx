import React from 'react';
import { PlayerObj } from '../model/PlayerObj';
import Card from './Card';
import Chips from './Chips';

const Player = ({ player, isActive, x, y }: { player: PlayerObj, isActive: boolean, x: number, y: number }) => {
  if (player) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        {isActive && <polygon transform="translate(20, 0)" points="0,10 -4,0 4,0" fill="white" />}
        
       
        <Chips chips={player.bankroll} text="Bankroll" x={10} y={50} />
        <Chips chips={player.stack} text="Chips" x={10} y={80} />
        <Chips chips={player.bet} text="Bet" x={10} y={110} />  
        <Card card={player.hand[0]} idx={0} x={0} y={135} isFolded={player.hasFolded} />
        <Card card={player.hand[1]} idx={1} x={0} y={135} isFolded={player.hasFolded} />
      </g>
    );
  } else {
    return null;
  }
};

export default Player;
