import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DrinksList from '@/app/components/drinks-list';
import { ReactNode } from 'react';

const theme = createTheme();

const MockWrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('DrinksList Component (Behavioral)', () => {
    const mockDrinks = [
        { id: '1', name: 'Margarita', image: 'https://test.com/margarita.jpg' },
        { id: '2', name: 'Rose', image: 'https://test.com/rose.jpg' },
    ];

    test('renders a link for every drink in the array', () => {
        render(<DrinksList drinks={mockDrinks} />, { wrapper: MockWrapper });

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);
        mockDrinks.forEach((drink, i) => {
            expect(links[i]).toHaveAttribute('href', `/drinks/${drink.id}`);
        });
    });

    test('renders the drink name inside the list tile', () => {
        render(<DrinksList drinks={mockDrinks} />, { wrapper: MockWrapper });

        mockDrinks.forEach((drink) => {
            expect(screen.getByText(drink.name)).toBeInTheDocument();
        });
    });

    test('renders the drink image', () => {
        render(<DrinksList drinks={mockDrinks} />, { wrapper: MockWrapper });

        const drink = mockDrinks[0];
        const img = screen.getByAltText(drink.name);
        expect(img).toHaveAttribute('src', drink.image);
    });

    test('handles empty drink lists', () => {
        render(<DrinksList drinks={[]} />, { wrapper: MockWrapper });
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});
