import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomePage } from './HomePage';

import { renderWithProviders } from '../../shared/utils';
import {
    fetchProperties,
    setError,
    setProperties
} from '../../redux/ducks/properties';
import { store } from '../../redux';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
}));

describe('HomePage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading state', () => {
        store.dispatch(fetchProperties());

        renderWithProviders(<HomePage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('loadingText')).toBeInTheDocument();
    });

    test('displays error state', async () => {
        const errorMessage = 'An error occurred';

        store.dispatch(setError(errorMessage));
        renderWithProviders(<HomePage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('errorText')).toBeInTheDocument();
        expect(screen.getByTestId('errorText')).toContainHTML(errorMessage);
    });

    test('renders properties', async () => {
        const properties = [
            {
                id: 1,
                title: 'Test Property',
                price: 100,
                address: '123 Test St',
                seller: 'Test Seller',
                description: 'Test Description',
                images: ['test.jpg']
            }
        ];

        store.dispatch(setProperties(properties));
        const { container } = renderWithProviders(<HomePage />, {});

        expect(screen.getByText(/Test Property/)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
