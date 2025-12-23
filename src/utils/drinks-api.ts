import { cleanMeasurement } from '@/utils/drinks';
import { Drink, DrinkApiData, DrinkIngredient, DrinkListItem } from '@/shared-types';

export function combineIngredientsAndUnit(drink: DrinkApiData): DrinkIngredient[] {
    // the shape of the data for ingredients look like this strIngredientX
    // Don't know how many there are, looks to be 15, but let's keep it dynamic in case the api changes
    const ingredientKeys = Object.keys(drink).filter(
        key => key.startsWith('strIngredient') && typeof drink[key] === 'string'
    );

    const ingredientWithUnits = ingredientKeys.map((ingredientKey, i) => {
        const key = `strMeasure${i + 1}`;
        const ingredientUnit = drink[key];
        return {
            name: drink[ingredientKey] as string,
            measurement: ingredientUnit ? cleanMeasurement(ingredientUnit) : undefined,
        };
    });

    return ingredientWithUnits;
}

export function toDrinkListItemData(drink: DrinkApiData): DrinkListItem {
    return {
        id: drink.idDrink,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
    };
}

export function toDrinkData(drink: DrinkApiData): Drink {
    return {
        id: drink.idDrink,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        ingredients: combineIngredientsAndUnit(drink),
        instructions: drink.strInstructions,
    };
}
