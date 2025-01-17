import { calculateEquity } from "./equity";

describe('calculateEquity', () => {
    it('should return 50% for two identical hands', () => {
        const hand1 = ['Tc', 'Th'];
        const hand2 = ['Td', 'Ts'];
        const result = calculateEquity(hand1, hand2, [], 100);
        expect(result[0]).toEqual(0.5);
        expect(result[1]).toEqual(0.5);
    });

    it('should return 100% for a hand against a weaker hand', () => {
        const hand1 = ['Td', 'Ts'];
        const hand2 = ['2d', '2s'];
        const community = ['Th', 'Tc', '3s', '4d', '5h'];
        const result = calculateEquity(hand1, hand2, community);
        expect(result[0]).toBeCloseTo(1);
        expect(result[1]).toBeCloseTo(0);
    });

    it('should be larger for a better hand', () => {
        const hand1 = ['As', 'Ac'];
        const hand2 = ['2s', '2h'];
        // const community = ['Th', 'Tc', '3s', '4d', '5h'];
        const result = calculateEquity(hand1, hand2);
        expect(result[0] > result[1]).toBeTruthy();
    });

    it('should be larger for a better hand including communities', () => {
        const hand1 = ['As', 'Ac'];
        const hand2 = ['2s', '2h'];
        const community = ['2d', '2c', 'Th'];
        const result = calculateEquity(hand1, hand2, community);
        expect(result[1] > result[0]).toBeTruthy();
    });

    it('should be determined if no cards left to draw', () => {
        const hand1 = ['As', 'Ac'];
        const hand2 = ['2s', '2h'];
        const community = ['2d', '2c', 'Th', 'Ts', 'Tc'];
        const result = calculateEquity(hand1, hand2, community);
        expect(result[0]).toEqual(1);
        expect(result[1]).toEqual(0);
    });

    it('should draw further cards if community is not full', () => {
        const hand1 = ['As', 'Kh'];
        const hand2 = ['2s', '4h'];
        const community = ['2d', '7c', '8d'];
        const result = calculateEquity(hand1, hand2, community, 1000);
        expect(result[0] > 0).toBeTruthy();
        expect(result[1] < 1).toBeTruthy();
    });

    it('should draw further cards if community is not full (with noble)', () => {
        const hand1 = ['Qh', 'Kh'];
        const hand2 = ['2s', '4h'];
        const community = ['2d', '7c', '8d', '4h', 'Jh'];
        const result = calculateEquity(hand1, hand2, community, 1000);
        expect(result[0] > 0).toBeTruthy();
        expect(result[1] < 1).toBeTruthy();
    });
});