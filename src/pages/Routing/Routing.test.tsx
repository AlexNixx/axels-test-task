import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Routing } from './Routing';

import { renderWithProviders, ShowLocation } from '../../utils';

describe('Test App Routing', () => {
    test('landing on Home Page', async () => {
        const homeRoute = '/';
        const { container } = renderWithProviders(
            <>
                <ShowLocation />
                <Routing />
            </>,
            { initialRoute: homeRoute }
        );

        expect(await screen.findByTestId('homePage')).toBeInTheDocument();
        expect(screen.getByTestId('locationDisplay')).toHaveTextContent(
            homeRoute
        );
        expect(container).toMatchSnapshot();
    });

    test('landing on Property Details page', async () => {
        const propertyRoute = '/property/2';
        const { container } = renderWithProviders(
            <>
                <ShowLocation />
                <Routing />
            </>,
            { initialRoute: propertyRoute }
        );

        expect(await screen.findByTestId('propertyPage')).toBeInTheDocument();
        expect(screen.getByTestId('locationDisplay')).toHaveTextContent(
            propertyRoute
        );
        expect(container).toMatchSnapshot();
    });

    test('landing on a bad page', async () => {
        const badRoute = '/some/bad/route';

        const { container } = renderWithProviders(
            <>
                <ShowLocation />
                <Routing />
            </>,
            { initialRoute: badRoute }
        );

        expect(screen.getByTestId('notFoundPage')).toBeInTheDocument();
        expect(screen.getByTestId('locationDisplay')).toHaveTextContent(
            badRoute
        );
        expect(container).toMatchSnapshot();
    });
});
