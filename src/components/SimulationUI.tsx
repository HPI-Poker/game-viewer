"use client"

import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
// import "../styles/SimulationUI.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faArrowLeft, faForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import { X } from 'lucide-react';
import RoundList from './RoundList';
import { SummaryObj } from '../model/SummaryObj';

enum Speed {
    Slow,
    Fast,
    VeryFast,
    TheFastest,
}
const defaultSpeed = 2000;

export class GameSimulationConfig {

    speedMs: number | null;
    isPaused: boolean;

    constructor(speedMs: number | null = defaultSpeed, isPaused = false) {
        this.speedMs = speedMs;
        this.isPaused = isPaused;
    }

    copyWithSpeed(speed: Speed) {
        const speedMs = this.speedToMs(speed);
        return this.copyWithSpeedMs(speedMs);
    }

    copyWithSpeedMs(speedMs: number | null): GameSimulationConfig {
        return new GameSimulationConfig(
            speedMs,
            speedMs === null ? this.isPaused : false,
        );
    }

    copyWithPaused(isPaused: boolean): GameSimulationConfig {
        return new GameSimulationConfig(
            this.speedToMs(Speed.Slow),
            isPaused,
        );
    }

    speedToMs(speed: Speed): number | null {
        if (speed === Speed.Slow) {
            return 2000;
        } else if (speed === Speed.Fast) {
            return 500;
        } else if (speed === Speed.VeryFast) {
            return 100;
        } else if (speed === Speed.TheFastest) {
            return 1;
        } else {
            return null;
        }
    }
}




function SimulationUI(
    { config, setConfig, skipToEnd, backToHome, round, setRound, summary }:
        { config: GameSimulationConfig, setConfig: (c: GameSimulationConfig) => any, skipToEnd: () => void, backToHome: () => void, round: number, setRound: (r: number) => any, summary: SummaryObj | null }
) {

    const [open, setOpen] = useState(false);
    const [rounds, setRounds] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                setConfig(config.copyWithPaused(!config.isPaused));
            }
            else if (e.key === 'ArrowRight') {
                setConfig(config.copyWithSpeed(Speed.Fast));
                console.log('ArrowRight');
            }
            else if (e.key === 'ArrowLeft') {
                setConfig(config.copyWithSpeed(Speed.Slow));
            }

        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [config, setConfig]);


    const topRounds = () => {
        setOpen(!open)
        setRounds(false)
    }

    const Rounds = () => {
        setRounds(!rounds)
        setOpen(false)
    }

    const clickTimer = useRef<NodeJS.Timeout | null>(null);
    const CLICK_DELAY = 250; // Adjust the delay as needed

    const actualSingleClickWrapper = (fn: () => MouseEventHandler<HTMLButtonElement> | undefined) => {
        // Clear any running timer (if user clicked again quickly)
        if (clickTimer.current) clearTimeout(clickTimer.current);

        // Start new timer for single click
        clickTimer.current = setTimeout(() => {
            fn();
        }, CLICK_DELAY);
    };

    const doubleClickWrapper = (fn: () => MouseEventHandler<HTMLButtonElement> | undefined) => {
        if (clickTimer.current) clearTimeout(clickTimer.current);
        fn();
    };

    return (
        <>
            <div className=' justify-center flex items-center space-x-5'>
                <div className='space-x-5  max-[1500px]:py-2 bg-white flex rounded-full py-3  px-7 shadow-md '>
                    <button className="text-text-color p-1 border rounded-full px-2 hover:scale-105 transition-all" onClick={backToHome}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    {config.isPaused ?
                        <button className="text-text-color p-1 border rounded-full px-2.5 hover:scale-105 transition-all" onClick={() => setConfig(config.copyWithPaused(false))}>
                            <FontAwesomeIcon icon={faPlay} />
                        </button> :
                        <button className="text-text-color p-1 border rounded-full px-3 hover:scale-105 transition-all" onClick={() => setConfig(config.copyWithPaused(true))} >
                            <FontAwesomeIcon icon={faPause} />
                        </button>
                    }
                    <button className="text-text-color p-1 border rounded-full px-2 hover:scale-105 transition-all" onClick={() => actualSingleClickWrapper(() => setConfig(config.copyWithSpeed(Speed.Fast)))} onDoubleClick={() => doubleClickWrapper(() => setRound(round + 1))}>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                    <button
                        className="text-text-color p-1 border rounded-full px-2 hover:scale-105 transition-all"
                        onClick={() => actualSingleClickWrapper(() => setConfig(config.copyWithSpeed(Speed.VeryFast)))}
                        onDoubleClick={() => doubleClickWrapper(() => setRound(round + 10))}
                    >
                        <FontAwesomeIcon icon={faFastForward} />
                    </button>
                    <button className="text-text-color font-medium hover:font-semibold transition-all hover:scale-105 max-[1500px]:text-sm" onClick={skipToEnd}>Summary</button>

                </div>
                <div className='px-4 max-[1500px]:px-3 max-[1500px]:py-3 py-4 cursor-pointer bg-white rounded-full border hover:scale-105 transition-all' onClick={topRounds}>
                    <h1 className='text-text-color font-medium max-[1500px]:text-sm'> Rounds</h1>
                </div>
                <div className='px-4 py-4 cursor-pointer max-[1500px]:px-3 max-[1500px]:py-3 bg-white rounded-full border hover:scale-105 transition-all' onClick={Rounds}>
                    <h1 className='text-text-color font-medium max-[1500px]:text-sm'>Top Rounds</h1>
                </div>


            </div>
            <div className='flex justify-center'>
                {rounds &&
                    <div className='absolute justify-center min-w-[20rem] z-30 mt-32 bg-white rounded-lg shadow-md p-2'>
                        <div className='flex items-center justify-between w-full px-2'>
                            <h1 className='text-text-color font-semibold text-xl'>
                                Top Rounds
                            </h1>
                            <div className='text-text-color cursor-pointer' onClick={(() => setRounds(!rounds))}>
                                <X className='size-5' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <RoundList
                                summary={summary}
                                onlyTopHands={true}
                                selectedRound={round}
                                setRound={setRound}
                            />
                        </div>
                    </div>}

                {open &&
                    <div className='absolute justify-center min-w-[20rem] z-30 mt-32 bg-white rounded-lg shadow-md p-2'>
                        <div className='flex items-center justify-between w-full px-2'>
                            <h1 className='text-text-color font-semibold text-xl'>
                                All Rounds
                            </h1>
                            <div className='text-text-color cursor-pointer' onClick={(() => setOpen(!open))}>
                                <X className='size-5' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <RoundList

                                summary={summary}
                                onlyTopHands={false}
                                selectedRound={round}
                                setRound={setRound}
                            />
                        </div>
                    </div>}
            </div>



        </>

    )

}

export default SimulationUI;