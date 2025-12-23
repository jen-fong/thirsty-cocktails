import { toDrinkData, toDrinkListItemData } from '@/app/utils/drinks-api';
import { Drink, DrinkListItem, SearchDrinksResponse } from '@/shared-types';

// ideally this would be placed inside a .env file but for the sake of this
// exercise, we can just leave it in this file for now
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function searchDrinksByName(name: string): Promise<DrinkListItem[]> {
    try {
        const queryString = new URLSearchParams({
            s: name,
        }).toString();
        const res = await fetch(`${DRINKS_URL}/search.php?${queryString}`);
        if (!res.ok) {
            // TODO figure out what to throw
            throw new Error('There was an error fetching the drinks');
        }
        const jsonData: SearchDrinksResponse = await res.json();
        if (Array.isArray(jsonData.drinks)) {
            return jsonData.drinks.map(toDrinkListItemData);
        }
        return [];
    } catch (err) {
        if (err instanceof Error) {
            // Ignoring network errors as requested in instructions
            console.error('A network error happened: ', err.message);
        }

        return [];
    }
}

export async function getDrinkById(id: string): Promise<Drink | undefined> {
    try {
        const queryString = new URLSearchParams({
            i: id,
        }).toString();
        const res = await fetch(`${DRINKS_URL}/lookup.php?${queryString}`);
        if (!res.ok) {
            // TODO figure out what to throw
            throw new Error('There was an error fetching the drinks');
        }
        const jsonData: SearchDrinksResponse = await res.json();
        if (Array.isArray(jsonData.drinks)) {
            const drink = jsonData.drinks[0];
            return toDrinkData(drink);
        }
    } catch (err) {
        if (err instanceof Error) {
            // Ignoring network errors as requested in instructions
            console.error('A network error happened: ', err.message);
        }
    }
}
