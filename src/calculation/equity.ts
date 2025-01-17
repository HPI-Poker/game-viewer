import { Deck } from "./deck";
import { evaluateHands } from "./evaluator";

/**
 * Monte Carlo equity for two players, given:
 * - hand1: 2 cards for player1
 * - hand2: 2 cards for player2
 * - knownCommunity: community cards already revealed
 * - iterations
 * Returns: [equity1, equity2] as a tuple of percentages of the win probabilities of hand1 and hand2.
 * - draws are added to both players' win counts.
 */
export function calculateEquity(
    hand1: string[],
    hand2: string[],
    knownCommunity: string[] = [],
    max_iterations = 1000
): [number, number] {
    let p1Wins = 0;
    let p2Wins = 0;

    // Number of community cards so far
    const c = knownCommunity.length;
    // We want up to 17 total community cards in this variant.
    const removeCards = [...knownCommunity, ...hand1, ...hand2];
    // Build a deck excluding known cards
    const deck = new Deck(removeCards);

    let i;
    for (i = 0; i < max_iterations; i++) {
        deck.reset();

        // Clone so we don't mutate original
        let simCommunity = [...knownCommunity];
        // Draw missing cards to reach at least 5 total...
        if (c < 5) {
            let needed = 5 - c;
            const drawn = deck.draw(needed);
            simCommunity = simCommunity.concat(drawn);
        }

        console.assert(simCommunity.length >= 5, "Community cards should be >= 5 now");

        while (isNoble(simCommunity[simCommunity.length - 1])) {
            const card = deck.draw(1);
            simCommunity.push(card[0]);
        }

        const result = evaluateHands(simCommunity, hand1, hand2);
        if (result === 1) {
            p1Wins++;
        } else if (result === 2) {
            p2Wins++;
        } else {
            p1Wins += 0.5;
            p2Wins += 0.5;
        }

        if (simCommunity.every(c => knownCommunity.includes(c))) {
            // result is determined
            console.log("Result determined after", i, "iterations");
            console.log("Community:", simCommunity);
            console.log("Hand1:", hand1);
            console.log("Hand2:", hand2);
            break;
        }
    }

    const equity1 = p1Wins / (i + 1);
    const equity2 = p2Wins / (i + 1);
    return [equity1, equity2];
}

function isNoble(card: string): boolean {
    const rank = card[0];
    return rank === "J" || rank === "Q" || rank === "K";
}
