// import { parseNumberQuantity, cleanMeasurement, standardizeUnit } from './path-to-your-file';

import {
    parseNumberQuantity,
    cleanMeasurement,
    standardizeUnit,
} from '@/utils/drinks-measurements';

describe('Drink Measurement Utils', () => {
    describe('parseNumberQuantity', () => {
        test('whole numbers are parsed', () => {
            expect(parseNumberQuantity('2')).toBe(2);
        });

        test('decimals are parsed', () => {
            expect(parseNumberQuantity('1.5')).toBe(1.5);
        });

        test('fractions are parsed', () => {
            expect(parseNumberQuantity('1/2')).toBe(0.5);
            expect(parseNumberQuantity('1 / 2')).toBe(0.5);
        });

        test('ranges are parsed with the lower value being picked', () => {
            // expect(parseNumberQuantity('3-4')).toBe(3);
            expect(parseNumberQuantity('10 - 12')).toBe(10);
        });

        test('should sum multiple number parts (mixed numbers)', () => {
            expect(parseNumberQuantity('1 1/2')).toBe(1.5);
        });

        test('should return 0 if no numbers are found', () => {
            expect(parseNumberQuantity('a dash of')).toBe(0);
        });
    });

    describe('cleanMeasurement', () => {
        test('strings are trimmed and lowercased', () => {
            expect(cleanMeasurement('  1.5 OZ  ')).toBe('1.5 oz');
        });
    });

    describe('standardizeUnit', () => {
        test('oz values are returned as is', () => {
            expect(standardizeUnit('2 oz')).toBe(2);
        });

        test('ml are converted to oz', () => {
            expect(standardizeUnit('60 ml')).toBe(2);
            expect(standardizeUnit('15 ml')).toBe(0.5);
        });

        test('cl are converted to oz', () => {
            expect(standardizeUnit('6 cl')).toBe(2);
        });

        test('tsp are converted to oz', () => {
            expect(standardizeUnit('3 tsp')).toBe(0.5);
        });

        test('tbsp/tblsp are converted to oz', () => {
            expect(standardizeUnit('1 tbsp')).toBe(0.5);
            expect(standardizeUnit('2 tblsp')).toBe(1);
        });

        test('cups are converted to oz', () => {
            expect(standardizeUnit('1 cup')).toBe(8);
            expect(standardizeUnit('1/2 cup')).toBe(4);
        });

        test('shots are converted to oz', () => {
            expect(standardizeUnit('1 shot')).toBe(1.5);
        });

        test('floating point results are rounded to 2 decimal places', () => {
            expect(standardizeUnit('10 ml')).toBe(0.33);
        });

        test('undefined is returned for non-numeric/unknown strings', () => {
            expect(standardizeUnit('a splash of juice')).toBeUndefined();
        });
    });
});
