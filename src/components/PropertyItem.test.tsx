import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { PropertyItem } from './PropertyItem';
import {
    renderWithProviders,
    convertPrice,
    ShowLocation,
    mockProperties
} from '../utils';

describe('Test PropertyItem Card', () => {
    const mockProperty = mockProperties[0];

    test('should be successfully rendered', async () => {
        renderWithProviders(
            <>
                <ShowLocation />
                <PropertyItem {...mockProperty} />
            </>,
            {}
        );

        expect(screen.getByTestId('propertyCard')).toBeInTheDocument();
        expect(screen.getByTestId('cardTitle')).toBeInTheDocument();
        expect(screen.getByTestId('cardPrice')).toBeInTheDocument();
        expect(screen.getByTestId('cardAddress')).toBeInTheDocument();
    });

    test('should be filled with text', async () => {
        const { container } = renderWithProviders(
            <>
                <ShowLocation />
                <PropertyItem {...mockProperty} />
            </>,
            {}
        );

        expect(screen.getByTestId('cardTitle')).toContainHTML(
            mockProperty.title
        );
        expect(screen.getByTestId('cardPrice')).toContainHTML(
            convertPrice(mockProperty.price)
        );
        expect(screen.getByTestId('cardAddress')).toContainHTML(
            mockProperty.address
        );

        expect(container).toMatchSnapshot();
    });

    test('should be navigated to the correct path on the details page', async () => {
        const route = `/property/${mockProperty.id}`;
        renderWithProviders(
            <>
                <ShowLocation />
                <PropertyItem {...mockProperty} />
            </>,
            {}
        );

        const propertyLink = screen.getByTestId('propertyLink');
        await act(async () => await userEvent.click(propertyLink));

        expect(screen.getByTestId('locationDisplay')).toHaveTextContent(route);
    });
});
