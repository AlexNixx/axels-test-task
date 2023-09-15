import { convertPrice } from './convertPrice';

describe('currency format', () => {
    test('Valid result', () => {
        const price = 1000;
        const result = convertPrice(price);
        expect(result).toStrictEqual('$1,000.00');
    });
    test('Valid result with double', () => {
        const price = 0.9;
        const result = convertPrice(price);
        expect(result).toStrictEqual('$0.90');
        expect(result).not.toStrictEqual('$0.9');
    });
    test('Invalid format', () => {
        const price = 1000;
        const result = convertPrice(price);
        expect(result).not.toStrictEqual('$1.000,00');
        expect(result).not.toStrictEqual('1,000.00$');
    });
});
