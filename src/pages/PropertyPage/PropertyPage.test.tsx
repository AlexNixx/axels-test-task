import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PropertyPage } from './PropertyPage';

import { convertPrice, mockProperties, renderWithProviders } from '../../utils';
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

describe('Test Property Details Page', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should be display loading state', () => {
        store.dispatch(fetchProperty(1));

        renderWithProviders(<PropertyPage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('loadingText')).toBeInTheDocument();
    });

    test('should be display error state', async () => {
        const errorMessage = 'An error occurred';

        store.dispatch(setError(errorMessage));
        renderWithProviders(<PropertyPage />, {});

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('errorText')).toBeInTheDocument();
        expect(screen.getByTestId('errorText')).toContainHTML(errorMessage);
    });

    test('should be display properties details', async () => {
        const mockProperty = mockProperties[0];

        store.dispatch(setProperty(mockProperty));
        const { container } = renderWithProviders(<PropertyPage />, {});

        expect(screen.getByTestId('propertyTitle')).toBeInTheDocument();
        expect(screen.getByTestId('propertyTitle')).toContainHTML(
            mockProperty.title
        );

        expect(screen.getByTestId('propertySeller')).toBeInTheDocument();
        expect(screen.getByTestId('propertySeller')).toContainHTML(
            `Seller: ${mockProperty.seller}`
        );

        expect(screen.getByTestId('propertyPrice')).toBeInTheDocument();
        expect(screen.getByTestId('propertyPrice')).toContainHTML(
            `Price: ${convertPrice(mockProperty.price)}`
        );

        expect(screen.getByTestId('propertyDescription')).toBeInTheDocument();
        expect(screen.getByTestId('propertyDescription')).toContainHTML(
            mockProperty.description
        );

        expect(container).toMatchSnapshot();
    });
});
