import { render, screen } from '@testing-library/react';
import { useParams, notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import DrinkPage from '@/app/drinks/[id]/page';

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
    notFound: jest.fn(),
    useRouter: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock('@/services/drinks', () => ({
    getDrinkById: jest.fn(),
}));

const theme = createTheme();
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('DrinkPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useParams as jest.Mock).mockReturnValue({ id: '11007' });
    });

    test('renders Loader when isPending is true', () => {
        (useQuery as jest.Mock).mockReturnValue({
            isPending: true,
        });

        render(<DrinkPage />, { wrapper });

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('calls notFound() when there is an error', () => {
        (useQuery as jest.Mock).mockReturnValue({
            isPending: false,
            error: new Error('Fetch failed'),
            data: null,
        });

        render(<DrinkPage />, { wrapper });

        expect(notFound).toHaveBeenCalled();
    });

    test('calls notFound() when data is empty', () => {
        (useQuery as jest.Mock).mockReturnValue({
            isPending: false,
            data: null,
        });

        render(<DrinkPage />, { wrapper });

        expect(notFound).toHaveBeenCalled();
    });

    test('renders drink details and chart when data is loaded', () => {
        const mockDrink = {
            id: '11007',
            name: 'Margarita',
            image: 'https://test.com/margarita.jpg',
            instructions: 'Shake it well.',
            ingredients: [
                { name: 'Tequila', measurement: '1.5 oz' },
                { name: 'Lime Juice', measurement: 'Splash of' },
            ],
        };

        (useQuery as jest.Mock).mockReturnValue({
            isPending: false,
            data: mockDrink,
        });

        render(<DrinkPage />, { wrapper });

        expect(screen.getAllByText(mockDrink.name)).toHaveLength(2);
        expect(screen.getByText(mockDrink.instructions)).toBeInTheDocument();

        const img = screen.getByAltText(mockDrink.name);
        expect(img).toBeInTheDocument();
        expect(screen.getByText(/Lime Juice/)).toBeInTheDocument();
        expect(screen.getByText(/Tequila/)).toBeInTheDocument();

        expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    test('pie chart is not shown when no valid ingredients', () => {
        const mockDrink = {
            id: '11007',
            name: 'Margarita',
            image: 'https://test.com/margarita.jpg',
            instructions: 'Shake it well.',
            ingredients: [{ name: 'Lime Juice', measurement: 'Splash of' }],
        };

        (useQuery as jest.Mock).mockReturnValue({
            isPending: false,
            data: mockDrink,
        });

        render(<DrinkPage />, { wrapper });

        expect(screen.getByText(/Lime Juice/)).toBeInTheDocument();
        expect(screen.queryByTestId('pie-chart')).toBeNull();
    });
});
