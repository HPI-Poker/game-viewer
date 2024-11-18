import { Bot } from "./Bot";
import { SummaryObj } from "./SummaryObj";

type GameStatus = 'error' | 'canceled' | 'waiting' | 'ongoing' | 'done';

interface GameResult {
    winner: Bot;
    loser: Bot;
    score: { [key: string]: number }; // scores of the bots
}

export class Game {
    id: string;
    bot1: Bot;
    bot2: Bot;
    status: GameStatus;
    log?: string[][];
    summary?: SummaryObj;
    result?: GameResult;

    constructor(id: string, bot1: Bot, bot2: Bot, status: GameStatus="waiting") {
        this.id = id;
        this.bot1 = bot1;
        this.bot2 = bot2;
        this.status = status;
    }

    getName() {
        return this.bot1.name + " vs " + this.bot2.name;
    }
}