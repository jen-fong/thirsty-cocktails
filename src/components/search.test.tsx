import Search from '@/components/search';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Search Component', () => {
    const mockProps = {
        label: 'Search Drinks',
        value: '',
        onChange: jest.fn(),
        onClearSearch: jest.fn(),
        name: 'drinkSearch',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('search is rendered with label and placeholder', () => {
        render(<Search {...mockProps} />);

        expect(screen.getByLabelText(mockProps.label)).toBeInTheDocument();
    });

    test('onChange is called when the user types', () => {
        render(<Search {...mockProps} />);

        const input = screen.getByLabelText(mockProps.label);
        fireEvent.change(input, { target: { value: 'Margarita' } });

        expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });

    test('current value is displayed when passed via props', () => {
        render(<Search {...mockProps} value="Tequila" />);

        const input = screen.getByLabelText(mockProps.label) as HTMLInputElement;
        expect(input.value).toBe('Tequila');
    });

    test('onClearSearch is called when the cancel icon button is clicked', () => {
        render(<Search {...mockProps} value="Old Fashioned" />);

        const clearButton = screen.getByLabelText('Clear search');
        fireEvent.click(clearButton);

        expect(mockProps.onClearSearch).toHaveBeenCalledTimes(1);
    });
});
