import { PlayerObj } from '../model/PlayerObj';
import Player from './Player';
import Board from './Board';
import Chips from './Chips';
import Filters from './Filters';
import pokerTableImage from "../assets/pokertable.jpg"
import { User } from 'lucide-react';

const PokerTable = (
  { communityCards, players, pot, round, activePlayerIdx }:
    { communityCards: string[], players: PlayerObj[], pot: number, round: string, activePlayerIdx: number }
) => {
  return (
    <>
      <div className='flex space justify-center px-6'>
        <div className='w-[18vmin] h-[70vmin] bg-white rounded-l-xl shadow-md'>
          <div className='flex p-5'>
            <h1 className='text-text-color flex items-center text-xl font-semibold'>
              <User />
              <div className='ml-2'>
              {players[0]?.name}
              </div>
            </h1>
          </div>
        </div>
        <div className='flex relative justify-center'>
          <div className='flex z-10 w-[126vmin]'>
            <svg width="1200" height="500" className='z-10 mt-40 ml-[21rem]'>
              <Filters />
              <text x={500} y={23} style={{ fontWeight: "600" }} fill="white " textAnchor='middle'>{round}</text>
              <Board x={500} y={110} cards={communityCards} />
              <Chips x={400} y={390} text="Pot" chips={pot} />

              <Player x={25} y={230} player={players[0]} isActive={activePlayerIdx === 0} />
              <Player x={815} y={230} player={players[1]} isActive={activePlayerIdx === 1} />
            </svg>
          </div>
          <div className='absolute -z-0 overflow-hidden w-[126vmin] h-[70vmin] flex justify-center items-center select-none'>
            <img src={pokerTableImage} className=' object-cover ' alt="" />
          </div>
        </div>
        <div className='w-[18vmin] h-[70vmin] bg-white rounded-r-xl shadow-md'>
          <div className='flex p-5'>
            <h1 className='text-text-color flex items-center text-xl font-semibold'>
              <User />
              <div className='ml-2'>
              {players[1]?.name}
              </div>
            </h1>
          </div>
        </div>
      </div>

    </>


  );
};

export default PokerTable;
