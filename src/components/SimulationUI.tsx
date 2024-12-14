"use client"

import React, { useEffect } from 'react';
// import "../styles/SimulationUI.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faArrowLeft, faForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

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


    { config, setConfig, skipToEnd, backToHome }:
        { config: GameSimulationConfig, setConfig: (c: GameSimulationConfig) => any, skipToEnd: () => void, backToHome: () => void }
) {

    const keyboardHandler = (e: KeyboardEvent) => {
        console.log(e.key);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keyboardHandler(e);

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

    return (
        <>
            <div className=' justify-center flex items-center space-x-5'>
                <div className='space-x-5 p-3 bg-white flex^ rounded-full  px-7 shadow-md '>
                    <button className="text-text-color p-1 border rounded-full px-2 hover:scale-105 transition-all" onClick={backToHome}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    {config.isPaused ?
                        <button className="text-text-color p-1 border rounded-full px-2.5 hover:scale-105 transition-all" onClick={() => setConfig(config.copyWithPaused(false))}>
                            <FontAwesomeIcon icon={faPlay} />
                        </button> :
                        <button className="text-text-color p-1 border rounded-full px-3 hover:scale-105 transition-all" onClick={() => setConfig(config.copyWithPaused(true))}>
                            <FontAwesomeIcon icon={faPause} />
                        </button>
                    }
                    <button className="text-text-color p-1 border rounded-full px-2 hover:scale-105 transition-all" onClick={() => setConfig(config.copyWithSpeed(Speed.Fast))}>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                    <button
                        className="text-text-color p-1 border rounded-full px-2 hover:scale-105 transition-all"
                        onClick={() => setConfig(config.copyWithSpeed(Speed.VeryFast))}
                        onDoubleClick={() => setConfig(config.copyWithSpeed(Speed.TheFastest))}
                    >
                        <FontAwesomeIcon icon={faFastForward} />
                    </button>
                    <button className="text-text-color font-medium hover:font-semibold transition-all hover:scale-105" onClick={skipToEnd}>Summary</button>

                </div>
                <div className='px-4 py-4 cursor-pointer bg-white rounded-full border hover:scale-105 transition-all'>
                    <h1 className='text-text-color font-medium'>Top Rounds</h1>
                </div>
            </div>



        </>

    )

}

export default SimulationUI;