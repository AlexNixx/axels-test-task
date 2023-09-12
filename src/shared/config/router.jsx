import { createBrowserRouter } from 'react-router-dom';

import { HomePage, PropertyPage, NotFoundPage } from '../../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/property/:id',
        element: <PropertyPage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);
