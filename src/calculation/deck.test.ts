import { Deck } from './deck';

describe('Deck', () => {
    it('should draw a card', () => {
        const deck = new Deck();
        const card = deck.draw();
        expect(card).toHaveLength(1);
    });

    it('should draw a card twice', () => {
        const deck = new Deck();
        const card = deck.draw();
        expect(card).toHaveLength(1);
        const card2 = deck.draw();
        expect(card2).toHaveLength(1);
    });

    it('should draw multiple cards', () => {
        const deck = new Deck();
        const cards = deck.draw(5);
        expect(cards).toHaveLength(5);
    });

    it('should draw multiple cards and the one card', () => {
        const deck = new Deck();
        const cards = deck.draw(5);
        expect(cards).toHaveLength(5);

        const card = deck.draw();
        expect(card).toHaveLength(1);
    });

    it('should not draw the same card twice', () => {
        const deck = new Deck();
        const card1 = deck.draw();
        const card2 = deck.draw();
        expect(card1).not.toEqual(card2);
    });

    it('should reset the deck', () => {
        const deck = new Deck();
        const card1 = deck.draw();
        expect(card1).toHaveLength(1);
        deck.reset();
        const card2 = deck.draw();
        expect(card2).toHaveLength(1);
    });
});