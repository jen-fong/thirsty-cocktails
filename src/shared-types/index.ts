export type DrinkApiData = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
    [k: string]: string | null;
};
export type SearchDrinksResponse = {
    drinks: DrinkApiData[] | string;
};

export type DrinkIngredient = {
    name: string;
    measurement?: string;
};
export type DrinkListItem = {
    id: string;
    name: string;
    image: string;
};

export type Drink = DrinkListItem & {
    ingredients: DrinkIngredient[];
    instructions: string;
};

export type PieChartData = {
    label: string;
    value: number;
    color: string;
};

export type PieChartLegend = {
    label: string;
    color: string;
};
