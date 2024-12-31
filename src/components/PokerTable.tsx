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
      <div className='flex justify-center'>
        <div className='w-[18vmin] h-[70vmin]  rounded-l-xl shadow-md'>
          <div className='w-[18vmin] h-[70vmin] bg-white rounded-l-xl shadow-md p-5'>

            <div>
              <div className='flex w-[15rem] items-center'>
                <p className='text-text-color flex items-center text-xl font-semibold  max-[1940px]:text-sm  '>
                  <User />
                  <h1 className='ml-2'>
                    {players[0]?.name}
                  </h1>
                </p>
              </div>

              <div className='mt-5'>
                <div className='flex w-[15rem] items-center mt-2'>
                  <p className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Bankroll:
                    </div>
                    <div className=''>
                      {players[0]?.bankroll}
                    </div>
                  </p>
                </div>
              </div>
              <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <p className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Chips:
                    </div>
                    <div className=''>
                      {players[0]?.stack}
                    </div>
                  </p>
                </div>
              </div>
              <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <p className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Bet:
                    </div>
                    <div className=''>
                      {players[0]?.bet}
                    </div>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='flex relative justify-center'>
          <div className='flex z-10 w-[126vmin] items-center justify-center'>
            <svg width="100%" height="100%" viewBox="0 0 1200 500" className='z-10 mt-40 ml-[11rem]'>
              <Filters />
              <text x={500} y={23} style={{ fontWeight: "600" }} fill="white " textAnchor='middle'>{round}</text>
              <Board x={500} y={110} cards={communityCards} />
              <Chips x={460} y={180} text="Pot" chips={pot}  />
              <Player x={25} y={230} player={players[0]} isActive={activePlayerIdx === 0} />

              <Player x={815} y={230} player={players[1]} isActive={activePlayerIdx === 1} />
            </svg>
          </div>
          <div className='absolute -z-0 overflow-hidden w-[126vmin] h-[70vmin] flex justify-center items-center select-none'>
            <img src={pokerTableImage} className=' object-cover ' alt="" />
          </div>
        </div>
        <div className='w-[18vmin] h-[70vmin] bg-white rounded-r-xl shadow-md p-5 text-right'>
        <div className=''>
              <div className='flex w-[15rem] items-center'>
                <p className='text-text-color flex items-center text-xl font-semibold  max-[1940px]:text-sm  '>
                  <User />
                  <h1 className='ml-2'>
                    {players[1]?.name}
                  </h1>
                </p>
              </div>

              <div className='mt-5'>
                <div className='flex w-[15rem] items-center mt-2'>
                  <p className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Bankroll:
                    </div>
                    <div className=''>
                      {players[1]?.bankroll}
                    </div>
                  </p>
                </div>
              </div>
              <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <p className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Chips:
                    </div>
                    <div className=''>
                      {players[1]?.stack}
                    </div>
                  </p>
                </div>
              </div>
              <div>
                <div className='flex w-[15rem] items-center mt-2'>
                  <p className='text-text-color flex items-center text-lg font-semibold max-[1940px]:text-sm space-x-2  '>
                    <div>
                      Bet:
                    </div>
                    <div className=''>
                      {players[1]?.bet}
                    </div>
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>

    </>


  );
};

export default PokerTable;
