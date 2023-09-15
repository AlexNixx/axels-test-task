import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PropertyPage } from './PropertyPage';

import { renderWithProviders } from '../../shared/utils';
import {
    fetchProperty,
    setError,
    setProperty
} from '../../redux/ducks/property';
import { store } from '../../redux';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
}));

describe('PropertyPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading state', () => {
        store.dispatch(fetchProperty(1));

        renderWithProviders(<PropertyPage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('loadingText')).toBeInTheDocument();
    });

    test('displays error state', async () => {
        const errorMessage = 'An error occurred';

        store.dispatch(setError(errorMessage));
        renderWithProviders(<PropertyPage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('errorText')).toBeInTheDocument();
        expect(screen.getByTestId('errorText')).toContainHTML(errorMessage);
    });

    test('renders property', async () => {
        store.dispatch(
            setProperty({
                id: 1,
                title: 'Test Property',
                price: 100,
                address: '123 Test St',
                seller: 'Test Seller',
                description: 'Test Description',
                images: ['test.jpg']
            })
        );
        const { container } = renderWithProviders(<PropertyPage />, {});

        expect(screen.getByText(/Test Property/)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
