/**
 * Evaluate who wins between two hands given community cards.
 * Return 1 if player1 wins, 2 if player2 wins, 0 if draw.
 * Minimal placeholder logic using if-else on sums, etc. Adjust for actual rules.
 */
export function evaluateHands(
    community: string[],
    hand1: string[],
    hand2: string[]
): number {
    // Example stub: count raw "value" from rank
    const val1 = getValue([...community, ...hand1]);
    const val2 = getValue([...community, ...hand2]);
    if (val1 > val2) return 1;
    if (val2 > val1) return 2;
    return 0;
}

function getValue(cards: string[]): number {
    // 1) Generate all 5-card combinations from the input array.
    // 2) Evaluate each combination using traditional poker hand rankings.
    // 3) Return the highest score among them.

    if (cards.length <= 5) {
        // If the array has 5 or fewer cards, just evaluate it directly.
        return rank5CardHand(cards);
    }

    // Otherwise, pick the best 5 of the N cards (common in Texas Hold'em is 7).
    let bestScore = 0;
    const combos = getAll5CardCombos(cards);
    for (const combo of combos) {
        const score = rank5CardHand(combo);
        if (score > bestScore) {
            bestScore = score;
        }
    }
    return bestScore;
}

/**
 * Primary function to calculate a 5-card hand's numeric rank:
 *  Categories (descending):
 *    9: Royal Flush       (special Straight Flush A-high)
 *    8: Straight Flush
 *    7: Four of a Kind
 *    6: Full House
 *    5: Flush
 *    4: Straight
 *    3: Three of a Kind
 *    2: Two Pair
 *    1: One Pair
 *    0: High Card
 *  We encode tiebreakers into the numeric result so that a larger value is always a better hand.
 */
function rank5CardHand(cards: string[]): number {
    // Parse rank/suit from each card like "Ac", "2d", etc.
    // Ranks: 2..9 => 2..9, T => 10, J => 11, Q => 12, K => 13, A => 14
    // Suits: c, d, h, s
    const parsed = parseCards(cards);
    const ranks = parsed.map((c) => c.rank).sort((a, b) => b - a); // descending
    const suits = parsed.map((c) => c.suit);

    const rankCounts = countBy(ranks);
    const suitCounts = countBy(suits);

    const isFlush = Object.values(suitCounts).some((count) => count >= 5);
    const uniqueRanks = Object.keys(rankCounts).map((r) => parseInt(r, 10)).sort((a, b) => b - a);

    // For convenience in detecting straights:
    // "Ace can be 14 or can also play as 1 in A-2-3-4-5"

    // Straight Flush
    if (isFlush) {
        const straightFlushScore = findBestStraightFlush(parsed);
        if (straightFlushScore > 0) {
            return straightFlushScore; // buildScore(8, [straightHigh]) or buildScore(9, [...]) if Royal
        }
    }

    // Four of a Kind
    const fourOfAKindRank = findWithCount(rankCounts, 4);
    if (fourOfAKindRank) {
        // Kickers are the rank(s) not in the quads
        const kicker = uniqueRanks.find((r) => r !== fourOfAKindRank) || 0;
        return buildScore(7, [fourOfAKindRank, kicker]);
    }

    // Full House (3 + 2)
    const threeOfAKindRank = findWithCount(rankCounts, 3);
    const pairRank = findWithCount(rankCounts, 2);
    if (threeOfAKindRank && pairRank) {
        return buildScore(6, [threeOfAKindRank, pairRank]);
    }

    // Flush
    if (isFlush) {
        // Tiebreak using top ranks
        return buildScore(5, getTiebreakOrder(ranks));
    }

    // Straight
    const isStraight = checkStraight(ranks);
    const straightHigh = getStraightHigh(ranks); // highest rank in the straight, or 0 if none
    if (isStraight) {
        // Tiebreak is the highest card in the straight
        return buildScore(4, [straightHigh]);
    }

    // Three of a Kind
    if (threeOfAKindRank) {
        const kickers = uniqueRanks.filter((r) => r !== threeOfAKindRank);
        return buildScore(3, [threeOfAKindRank, ...kickers]);
    }

    // Two Pair
    // e.g. [10,10], [7,7], kicker 5
    const pairs = findAllWithCount(rankCounts, 2);
    if (pairs.length >= 2) {
        const highPair = Math.max(...pairs);
        const lowPair = Math.min(...pairs);
        const kicker = uniqueRanks.find((r) => r !== highPair && r !== lowPair) || 0;
        return buildScore(2, [highPair, lowPair, kicker]);
    }

    // One Pair
    if (pairs.length === 1) {
        const onlyPair = pairs[0];
        const kickers = uniqueRanks.filter((r) => r !== onlyPair);
        return buildScore(1, [onlyPair, ...kickers]);
    }

    // High Card
    return buildScore(0, getTiebreakOrder(ranks));
}

/** Return all 5-combinations from "cards". */
function getAll5CardCombos(cards: string[]): string[][] {
    const results: string[][] = [];
    const n = cards.length;
    const combo: number[] = [];

    function backtrack(start: number) {
        if (combo.length === 5) {
            results.push(combo.map((idx) => cards[idx]));
            return;
        }
        for (let i = start; i < n; i++) {
            combo.push(i);
            backtrack(i + 1);
            combo.pop();
        }
    }

    backtrack(0);
    return results;
}

/** Parse an array of string-cards like "Ts", "Ac" => {rank: 10, suit: 's'} */
function parseCards(cards: string[]): Array<{ rank: number; suit: string }> {
    return cards.map((card) => {
        const rankChar = card[0];
        const suit = card[card.length - 1];
        return { rank: rankToNumber(rankChar), suit };
    });
}

/** Convert '2'..'9', 'T', 'J', 'Q', 'K', 'A' to 2..14. */
function rankToNumber(rankChar: string): number {
    switch (rankChar) {
        case "T":
            return 10;
        case "J":
            return 11;
        case "Q":
            return 12;
        case "K":
            return 13;
        case "A":
            return 14;
        default:
            return parseInt(rankChar, 10) || 0;
    }
}

/** Count how many times each item appears. */
function countBy(arr: number[] | string[]): Record<string, number> {
    return arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
}

/**
 * Find the best straight flush among the given cards (parsed with rank, suit).
 * Returns 0 if none found; else returns buildScore(8 or 9, [topCard,...]).
 */
function findBestStraightFlush(parsed: Array<{ rank: number; suit: string }>): number {
    // Group by suit
    const suitMap: Record<string, number[]> = {};
    for (const c of parsed) {
        if (!suitMap[c.suit]) suitMap[c.suit] = [];
        suitMap[c.suit].push(c.rank);
    }

    let bestScore = 0;
    // For each suit that has >= 5 cards, check straight possibilities
    for (const suit of Object.keys(suitMap)) {
        const ranksDesc = suitMap[suit].sort((a, b) => b - a);
        // find straights in ranksDesc
        const combos = getStraightCombos(ranksDesc);
        for (const straight of combos) {
            const top = straight[0]; // top rank
            // If A=14 is top, see if it's a Royal flush (A-K-Q-J-10)
            if (straight[0] === 14 && straight[1] === 13 && straight[2] === 12 && straight[3] === 11 && straight[4] === 10) {
                // Royal Flush
                const royalScore = buildScore(9, [14, 14, 14, 14, 14]);
                bestScore = Math.max(bestScore, royalScore);
            } else {
                // Straight Flush
                const sfScore = buildScore(8, [top]);
                bestScore = Math.max(bestScore, sfScore);
            }
        }
    }
    return bestScore;
}

/**
 * Helper: return all 5-card "straight" sequences from sorted ranks descending.
 * E.g. if we have 7 cards of a suit [14,13,12,11,10,9,8], that yields
 * [14,13,12,11,10] => top=14, plus [13,12,11,10,9], plus [12,11,10,9,8], etc.
 */
function getStraightCombos(ranksDesc: number[]): number[][] {
    const results: number[][] = [];
    const unique = Array.from(new Set(ranksDesc)).sort((a, b) => b - a);

    // Normal 5-card descending runs
    for (let i = 0; i <= unique.length - 5; i++) {
        const slice = unique.slice(i, i + 5);
        if (slice[0] - slice[4] === 4) {
            // consecutive (e.g., 14,13,12,11,10)
            results.push(slice);
        }
    }

    // A-lower check: if ranks contain A(14),2,3,4,5 -> 5-high straight
    if (
        unique.includes(14) &&
        unique.includes(5) &&
        unique.includes(4) &&
        unique.includes(3) &&
        unique.includes(2)
    ) {
        results.push([5, 4, 3, 2, 1]);
    }
    return results;
}

/**
 * Check if an array of ranks is a straight (5 consecutive).
 * Expects descending ranks (e.g. [14,13,12,11,10]).
 * Also handle the A-2-3-4-5 special case.
 */
function checkStraight(ranksDesc: number[]): boolean {
    if (ranksDesc.length < 5) return false;
    // Convert to unique sorted descending
    const unique = Array.from(new Set(ranksDesc)).sort((a, b) => b - a);

    // Simple linear check
    const straights = [];
    for (let i = 0; i <= unique.length - 5; i++) {
        const slice = unique.slice(i, i + 5);
        // e.g. [14,13,12,11,10] => consecutive
        const is5CardRun = slice[0] - slice[4] === 4;
        if (is5CardRun) straights.push(slice);
    }

    // A-2-3-4-5 check
    // e.g. ranks = [14,5,4,3,2] => "Ace-lower" wheel straight
    if (
        unique.includes(14) &&
        unique.includes(2) &&
        unique.includes(3) &&
        unique.includes(4) &&
        unique.includes(5)
    ) {
        return true;
    }

    return false;
}

/** Return the highest rank in the straight (descending order). 0 if none. */
function getStraightHigh(ranksDesc: number[]): number {
    if (!checkStraight(ranksDesc)) return 0;
    const unique = Array.from(new Set(ranksDesc)).sort((a, b) => b - a);

    // Normal straight check
    for (let i = 0; i <= unique.length - 5; i++) {
        const slice = unique.slice(i, i + 5);
        if (slice[0] - slice[4] === 4) {
            return slice[0]; // top rank
        }
    }

    // Wheel (A-2-3-4-5)
    if (
        unique.includes(14) &&
        unique.includes(5) &&
        unique.includes(4) &&
        unique.includes(3) &&
        unique.includes(2)
    ) {
        return 5; // "5-high" straight
    }
    return 0;
}

/** Find a rank with a given count (e.g. for quads, trips, pairs). */
function findWithCount(countMap: Record<string, number>, count: number): number | null {
    for (const [r, c] of Object.entries(countMap)) {
        if (c === count) {
            return parseInt(r, 10);
        }
    }
    return null;
}

/** Find all ranks that appear with a given count (e.g., all pairs). */
function findAllWithCount(countMap: Record<string, number>, count: number): number[] {
    const result: number[] = [];
    for (const [r, c] of Object.entries(countMap)) {
        if (c === count) result.push(parseInt(r, 10));
    }
    return result.sort((a, b) => b - a); // descending
}

/**
 * For flush & high card, we compare highest-lower-lower...
 * This returns descending ranks for final tie-break. E.g. [14,12,10,6,3].
 */
function getTiebreakOrder(ranksDesc: number[]): number[] {
    const unique = [...ranksDesc].sort((a, b) => b - a);
    // For a 5-card set, just use the top 5 sorted desc
    if (unique.length >= 5) {
        return unique.slice(0, 5);
    }
    return unique;
}

/**
 * Build a final numeric score:
 *  mainCategory * largeFactor + tieBreakers...
 *
 *  E.g., category=4 (Straight) => 4_000_000_000 + (topCard in the next digits)
 *  This approach ensures that bigger categories always outrank smaller categories.
 *  Tie-breakers are appended in descending significance.
 */
function buildScore(category: number, tiebreakers: number[]): number {
    // We can just multiply by a large enough base to ensure separation between categories (e.g. base=15^5).
    // For simplicity, let’s do 1e8 * category + sum-of-kickers.
    // We do a more robust approach: each kicker is limited up to 14, so we can shift them carefully.
    let score = category * 1_000_000_000_000; // big shift for category
    // Next each tiebreaker gets appended in a base-15 manner, for example
    for (let i = 0; i < tiebreakers.length; i++) {
        score += tiebreakers[i] * Math.pow(15, tiebreakers.length - i - 1);
    }
    return score;
}
