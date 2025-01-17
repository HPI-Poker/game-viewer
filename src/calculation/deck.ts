import CardDeck from "card-deck";

const CARDS = [
    "2c", "2d", "2h", "2s",
    "3c", "3d", "3h", "3s",
    "4c", "4d", "4h", "4s",
    "5c", "5d", "5h", "5s",
    "6c", "6d", "6h", "6s",
    "7c", "7d", "7h", "7s",
    "8c", "8d", "8h", "8s",
    "9c", "9d", "9h", "9s",
    "Tc", "Td", "Th", "Ts",
    "Jc", "Jd", "Jh", "Js",
    "Qc", "Qd", "Qh", "Qs",
    "Kc", "Kd", "Kh", "Ks",
    "Ac", "Ad", "Ah", "As",
];

export class Deck {
    cards: string[];
    deck: CardDeck;

    constructor(removeCards: string[] = []) {
        this.cards = CARDS.filter(card => !removeCards.includes(card));
        this.deck = new CardDeck([...this.cards]);
        this.deck.shuffle();
    }

    draw(n=1): string[] {
        const draw = this.deck.draw(n);
        if (n === 1) {
            return [draw];
        }
        return draw;
    }

    reset() {
        this.deck = new CardDeck([...this.cards]);
        this.deck.shuffle();
    }
}
