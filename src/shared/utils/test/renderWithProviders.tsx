import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { Routing } from '../../../Routing';
import { store } from '../../../redux';

export const renderWithProviders = (
    component: React.ReactNode,
    initialRoute = '/'
) =>
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialRoute]}>
                <Routing />
                {component}
            </MemoryRouter>
        </Provider>
    );
