import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from '../../redux';

export const renderWithProviders = (
    component: React.ReactNode,
    { initialRoute = '/' }: { initialRoute?: string }
) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialRoute]}>
                {component}
            </MemoryRouter>
        </Provider>
    );
};
