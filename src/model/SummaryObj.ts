export class Bankroll {
    roundNumber: number;
    bankroll: number[];

    constructor(obj: any) {
        this.roundNumber = obj['Round number'];
        this.bankroll = [obj['Player_1_bankroll'], obj['Player_2_bankroll']];
    }
}

export class Hand {
    roundNumber: number;
    chipDelta: number[];

    constructor(obj: any) {
        this.roundNumber = obj['Round number'];
        this.chipDelta = obj['Chip delta'];
    }
}

export class PlayerStats {
    name: string;
    score: number;
    VPIP: number;
    PFR: number;
    illegals: number;
    timeouts: number;

    constructor(obj: any, score: number) {
        this.score = score;
        this.name = obj['name'];
        this.VPIP = obj['VPIP'];
        this.PFR = obj['PFR'];
        this.illegals = obj['illegal actions'];
        this.timeouts = obj['timeouts'];
    }
}

export class SummaryObj {
    title: string;
    tie: boolean;
    winner: string;
    startingStack: number;
    numberOfRounds: number;
    bankrolls: Bankroll[];
    topHands: Hand[];
    playerStats: PlayerStats[];
    logs: string[];

    constructor(obj: any) {
        this.title = obj['Game Summary'];
        this.tie = obj['Tie'];
        this.winner = obj['Winner'];
        this.startingStack = obj['Starting stack'];
        this.numberOfRounds = obj['Number of rounds'];
        this.bankrolls = obj['Discretized bankroll counts'].map((bankrollObj: any) => new Bankroll(bankrollObj));
        this.topHands = obj['Top hands'].map((topHandObj: any) => new Hand(topHandObj));
        this.logs = obj['Logs'];
        
        const scores =  obj['Score'].split(" vs ").map((score: string) => parseInt(score));
        this.playerStats = obj['Player stats'].map((playerStatsObj: any, i: number) => new PlayerStats(playerStatsObj, scores[i]));
    }
}