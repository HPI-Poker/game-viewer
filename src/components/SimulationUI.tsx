import React from 'react';
import "../styles/SimulationUI.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faArrowLeft, faForward, faFastForward } from '@fortawesome/free-solid-svg-icons';

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

    constructor(speedMs: number | null = defaultSpeed, isPaused=false) {
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
    { config, setConfig, skipToEnd, backToHome } :
    { config: GameSimulationConfig, setConfig: (c: GameSimulationConfig) => any, skipToEnd: () => void, backToHome: () => void }
) {
    return <div>
        <button className="ui-buttons" style={{marginRight: 15}} onClick={backToHome}><FontAwesomeIcon icon={faArrowLeft} /></button>
        { config.isPaused ?
            <button className="ui-buttons" onClick={() => setConfig(config.copyWithPaused(false))}>
                <FontAwesomeIcon icon={faPlay} />
            </button> :
            <button className="ui-buttons" onClick={() => setConfig(config.copyWithPaused(true))}>
                <FontAwesomeIcon icon={faPause} />
            </button> 
        }
        <button className="ui-buttons" onClick={() => setConfig(config.copyWithSpeed(Speed.Fast))}>
            <FontAwesomeIcon icon={faForward} />
        </button>
        <button
            className="ui-buttons"
            onClick={() => setConfig(config.copyWithSpeed(Speed.VeryFast))}
            onDoubleClick={() => setConfig(config.copyWithSpeed(Speed.TheFastest))}
        >
            <FontAwesomeIcon icon={faFastForward} />
        </button>
        <button style={{marginLeft: 15}} className="ui-buttons" onClick={skipToEnd}>Summary</button>
    </div>;
}

export default SimulationUI;