import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomePage } from './HomePage';

import { renderWithProviders, mockProperties } from '../../utils';
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

describe('Test Home Page', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should be display loading state', () => {
        store.dispatch(fetchProperties());

        renderWithProviders(<HomePage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('loadingText')).toBeInTheDocument();
    });

    test('should be display error state', async () => {
        const errorMessage = 'An error occurred';

        store.dispatch(setError(errorMessage));
        renderWithProviders(<HomePage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('errorText')).toBeInTheDocument();
        expect(screen.getByTestId('errorText')).toContainHTML(errorMessage);
    });

    test('should be display properties cards', async () => {
        store.dispatch(setProperties(mockProperties));
        const { container } = renderWithProviders(<HomePage />, {});

        expect(screen.getByText(/Test Property/)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
