const NUMBER_REGEX = /(\d+\/\d+|\d+(\.\d+)?)/g;
// Handles decimals, fractions, and whole numbers in string format
export function parseNumberQuantity(value: string) {
    const parts = value.match(NUMBER_REGEX) || [];
    const toNumberQuantity = parts.reduce((accum, currPart) => {
        const isFraction = currPart.includes('/');
        if (isFraction) {
            const [num, fraction] = currPart.split('/').map(Number);
            accum += num / fraction;
        } else {
            accum += Number(currPart);
        }

        return accum;
    }, 0);

    return toNumberQuantity;
}

export function cleanMeasurement(string: string): string {
    return string.toLowerCase().trim();
}

export function standardizeUnit(measurement: string): number | undefined {
    const cleanStr = cleanMeasurement(measurement);
    const value = parseNumberQuantity(cleanStr);

    let convertedValue;
    if (cleanStr.includes('ml')) {
        convertedValue = value / 30;
    } else if (cleanStr.includes('cl')) {
        convertedValue = value / 3;
    } else if (cleanStr.includes('tsp')) {
        convertedValue = value / 6;
    } else if (cleanStr.includes('tbsp') || cleanStr.includes('tblsp')) {
        convertedValue = value / 2;
    } else if (cleanStr.includes('cup')) {
        convertedValue = value * 8;
    } else if (cleanStr.includes('oz')) {
        convertedValue = value;
    }

    if (convertedValue) {
        // round to 2 dec places
        return Math.round(convertedValue * 100) / 100;
    }
}
