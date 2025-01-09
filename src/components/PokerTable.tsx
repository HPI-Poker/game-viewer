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
      <div className='flex flex-column justify-center items-center m-5'>
        <div className='w-[22vmin] h-full rounded-l-xl shadow-md'>
          <div className='w-full h-full bg-white rounded-l-xl shadow-md p-3 text-right'>
            <div>
              <div className='flex w-[15rem] items-center' >
                <div className='text-text-color flex items-center justify-start text-xl font-semibold  max-[1940px]:text-sm' >
                  <div>
                    <User />
                  </div>
                  <span className='ml-1' style={{ textOverflow: 'ellipsis', width: '100%' }}>
                    {players[0]?.name}
                  </span>
                </div>
              </div>

              <div className='mt-5'>
                <div className='flex w-[15rem] items-center mt-2'>
                  <div className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Bankroll:
                    </div>
                    <div className=''>
                      {players[0]?.bankroll}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <div className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Chips:
                    </div>
                    <div className=''>
                      {players[0]?.stack}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <div className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Bet:
                    </div>
                    <div className=''>
                      {players[0]?.bet}
                    </div>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
        <div className='flex relative justify-center shadow-md'>
          <div className='flex z-10 w-[126vmin] items-center justify-center'>
            <svg width="100%" height="100%" viewBox="0 0 1000 666.6666" className='z-10'>
              <image href={pokerTableImage} width="100%" height="100%" />
              <Filters />
              <text x={500} y={25} style={{ fontWeight: "600" }} fontSize="25" fill="white" textAnchor='middle'>{round}</text>
              <Board x={500} y={200} cards={communityCards} />
              {pot > 0 && <Chips x={430} y={400} text="" chips={pot} />}
              <Player x={25} y={230} player={players[0]} isActive={activePlayerIdx === 0} />

              <Player x={815} y={230} player={players[1]} isActive={activePlayerIdx === 1} />
            </svg>
          </div>
          {/* <div className='absolute -z-0 overflow-hidden w-[126vmin] h-[70vmin] flex justify-center items-center select-none'>
            <img src={pokerTableImage} className=' object-cover ' alt="" />
          </div> */}
        </div>
        <div className='w-[22vmin] h-full bg-white rounded-r-xl shadow-md p-3 text-right'>
          <div>
            <div className='flex w-full items-center'>
              <div className='text-text-color flex items-center justify-start text-xl font-semibold  max-[1940px]:text-sm'>
                <div>
                  <User />
                </div>
                <span className='ml-1' style={{ textOverflow: 'ellipsis' }}>
                  {players[1]?.name}
                </span>
              </div>
            </div>

            <div className='mt-5'>
              <div className='flex w-[15rem] items-center mt-2'>
                <div className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                  <div>
                    Bankroll:
                  </div>
                  <div className=''>
                    {players[1]?.bankroll}
                  </div>
                </div>
              </div>
            </div>
            {/* <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <div className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Chips:
                    </div>
                    <div className=''>
                      {players[1]?.stack}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <div className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Bet:
                    </div>
                    <div className=''>
                      {players[1]?.bet}
                    </div>
                  </div>
                </div>
              </div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokerTable;
