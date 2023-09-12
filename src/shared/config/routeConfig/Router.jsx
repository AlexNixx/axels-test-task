import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../../../pages/HomePage/HomePage';
import { PropertyPage } from '../../../pages/PropertyPage/PropertyPage';
import { NotFoundPage } from '../../../pages/NotFoundPage/NotFoundPage';

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
