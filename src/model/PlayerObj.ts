export class PlayerObj {
  name: string;
  bankroll: number;
  stack: number;
  bet: number;
  hand: string[];
  hasFolded: boolean;
  text: string;

  constructor(
    name: string,
    bankroll: number,
    stack: number,
    bet = 0,
    hand: string[] = [],
    hasFolded = false,
    text = "",
  ) {
    this.name = name;
    this.bankroll = bankroll;
    this.stack = stack;
    this.bet = bet;
    this.hand = hand;
    this.hasFolded = hasFolded;
    this.text = text;
  }

  copyAndSetStack(stack: number, bet = 0) {
    return new PlayerObj(
      this.name,
      this.bankroll,
      stack,
      bet,
      this.hand,
      this.hasFolded,
      this.text,
    );
  }

  copyWithNewHand(hand: string[]) {
    return new PlayerObj(
      this.name,
      this.bankroll,
      this.stack,
      this.bet,
      hand,
      this.hasFolded,
      this.text,
    );
  }

  copyWithFolded(hasFolded: boolean) {
    return new PlayerObj(
      this.name,
      this.bankroll,
      this.stack,
      this.bet,
      this.hand,
      hasFolded,
      this.text,
    );
  }

  copyAndSetBankroll(bankroll: number) {
    return new PlayerObj(
      this.name,
      bankroll,
      this.stack,
      this.bet,
      this.hand,
      this.hasFolded,
      this.text,
    );
  }

  copyWithText(text: string) {
    return new PlayerObj(
      this.name,
      this.bankroll,
      this.stack,
      this.bet,
      this.hand,
      this.hasFolded,
      text,
    );
  }
}