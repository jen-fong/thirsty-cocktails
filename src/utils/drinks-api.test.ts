import { DrinkApiData } from '@/shared-types';
import { toDrinkData, toDrinkListItemData, combineIngredientsAndUnit } from '@/utils/drinks-api';

describe('Drink API Transformation Utils', () => {
    const mockApiDrink: DrinkApiData = {
        idDrink: '17208',
        strDrink: 'Rose',
        strInstructions:
            'Shake together in a cocktail shaker, then strain into chilled glass. Garnish and serve.',
        strDrinkThumb: 'https://test.com/image.png',
        strIngredient1: 'Dry Vermouth',
        strIngredient2: 'Gin',
        strIngredient3: null,
        strIngredient4: null,
        strMeasure1: '1/2 oz ',
        strMeasure2: '1 oz ',
        strMeasure3: null,
        strMeasure4: null,
    };

    describe('combineIngredientsAndUnit', () => {
        test('ingredients are paired with their measurements', () => {
            const result = combineIngredientsAndUnit(mockApiDrink);

            expect(result).toHaveLength(2);
            expect(result).toEqual([
                {
                    name: 'Dry Vermouth',
                    measurement: '1/2 oz',
                },
                {
                    name: 'Gin',
                    measurement: '1 oz',
                },
            ]);
        });

        test('undefined is returned for measurement if strMeasure key is null', () => {
            const drinkWithNoMeasures = {
                idDrink: '17208',
                strDrink: 'Rose',
                strInstructions:
                    'Shake together in a cocktail shaker, then strain into chilled glass. Garnish and serve.',
                strDrinkThumb: 'https://test.com/image.png',
                strIngredient1: 'Water',
                strMeasure1: null,
            };
            const result = combineIngredientsAndUnit(drinkWithNoMeasures);

            expect(result).toEqual([
                {
                    name: 'Water',
                    measurement: undefined,
                },
            ]);
        });

        test('empty drink object returns empty data set', () => {
            const result = combineIngredientsAndUnit({} as DrinkApiData);
            expect(result).toEqual([]);
        });
    });

    describe('toDrinkListItemData', () => {
        test('API data is transformed to a DrinkListItem data format', () => {
            const result = toDrinkListItemData(mockApiDrink);

            expect(result).toEqual({
                id: mockApiDrink.idDrink,
                name: mockApiDrink.strDrink,
                image: mockApiDrink.strDrinkThumb,
            });
        });
    });

    describe('toDrinkData', () => {
        test('API data is transformed to a Drink data format', () => {
            const result = toDrinkData(mockApiDrink);

            expect(result).toEqual({
                id: mockApiDrink.idDrink,
                name: mockApiDrink.strDrink,
                image: mockApiDrink.strDrinkThumb,
                instructions: mockApiDrink.strInstructions,
                ingredients: [
                    {
                        name: 'Dry Vermouth',
                        measurement: '1/2 oz',
                    },
                    {
                        name: 'Gin',
                        measurement: '1 oz',
                    },
                ],
            });
        });
    });
});
