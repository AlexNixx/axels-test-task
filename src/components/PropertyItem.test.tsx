import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { PropertyItem, PropertyItemProps } from './PropertyItem';
import {
    renderWithProviders,
    convertPrice,
    ShowLocation
} from '../shared/utils';

describe('Test PropertyItem Card', () => {
    let defaultProps: PropertyItemProps;
    beforeEach(() => {
        defaultProps = {
            id: 1,
            title: 'Property Title',
            price: 1000,
            address: 'Address, Kyiv',
            images: ['imageurl']
        };
    });

    test('should be successfully rendered', async () => {
        renderWithProviders(<PropertyItem {...defaultProps} />);

        expect(screen.getByTestId('propertyCard')).toBeInTheDocument();
        expect(screen.getByTestId('cardTitle')).toBeInTheDocument();
        expect(screen.getByTestId('cardPrice')).toBeInTheDocument();
        expect(screen.getByTestId('cardAddress')).toBeInTheDocument();
    });

    test('should be filled with text', async () => {
        const { container } = renderWithProviders(
            <PropertyItem {...defaultProps} />
        );

        expect(screen.getByTestId('cardTitle')).toContainHTML(
            defaultProps.title
        );
        expect(screen.getByTestId('cardPrice')).toContainHTML(
            convertPrice(defaultProps.price)
        );
        expect(screen.getByTestId('cardPrice')).not.toContainHTML(
            '' + defaultProps.price
        );
        expect(screen.getByTestId('cardAddress')).toContainHTML(
            defaultProps.address
        );

        expect(container).toMatchSnapshot();
    });

    test('should navigate to correct path details page', async () => {
        const route = `/property/${defaultProps.id}`;
        renderWithProviders(
            <>
                <ShowLocation />
                <PropertyItem {...defaultProps} />
            </>
        );

        const propertyLink = screen.getByTestId('propertyLink');
        await act(async () => await userEvent.click(propertyLink));

        expect(screen.getByTestId('locationDisplay')).toHaveTextContent(route);
    });
});
