export enum EResult {
    unknown = "__UNKNOWN__",
    draw = "__DRAW__",
    error = "__ERROR__",
}
export type Result = string | EResult; // winning player name or EResult 

export class GameResult {
  result: Result;
  amountWon: number;

  constructor(result: Result, amountWon: number) {
    this.result = result;
    this.amountWon = amountWon;
  }
}

export class UnknownResult extends GameResult {
  constructor() {
    super(EResult.unknown, 0);
  }
}

export default class PlayerMatrix {
  players: string[];
  results: Map<string, GameResult>;

  constructor(players: string[], results: Map<string, GameResult> | null = null) {
    this.players = players.slice().sort();
    this.results = results ?? this._initializeResultMap(players);
  }
  
  _initializeResultMap(players: string[]): Map<string, GameResult> {
    const entries: any[] = [];

    for (const player1 of players) {
      for (const player2 of players) {
        entries.push([
          this._getKey(player1, player2),
          new UnknownResult(),
        ]);
      }
    }

    return new Map(entries);
  }

  copyBySettingResult(player1: string, player2: string, money1: number, money2: number): PlayerMatrix {
    const result = money1 > money2 ? player1 : money1 < money2 ? player2 : EResult.draw;
    const amountWon = Math.max(money1, money2);
  
    const newResults = new Map(this.results.entries());
    const key = this._getKey(player1, player2);
    newResults.set(key, new GameResult(result, amountWon));

    return new PlayerMatrix(this.players, new Map(newResults));
  }

  copyByAddingPlayer(player: string): PlayerMatrix {
    const newPlayers = [...this.players, player].sort();
    const newResults = new Map(this.results.entries());
    for (const existingPlayer of this.players) {
      const key = this._getKey(existingPlayer, player);
      newResults.set(key, new UnknownResult());
    }
    return new PlayerMatrix(newPlayers, new Map(newResults));
  }

  getPlayers() {
    return this.players.slice();
  }

  getGames(player: string): GameResult[] {
    return Array.from(this.results.entries())
        .filter(([key]) => key.includes(player))
        .map(([, value]) => value);
  }

  getResult(player1: string, player2: string): GameResult {
    const result = this.results.get(this._getKey(player1, player2));
    if (result) {
      return result;
    } else {
      console.error(`Unknown result ${player1} vs. ${player2}`);
      return new UnknownResult();
    }
  }

  _getKey(player1: string, player2: string) {
    return [player1, player2].sort().join("-");
  }
}