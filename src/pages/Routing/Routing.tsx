import { Route, Routes } from 'react-router-dom';

import { HomePage } from '../HomePage/HomePage';
import { PropertyPage } from '../PropertyPage/PropertyPage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export const Routing = () => (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/property/:id' element={<PropertyPage />} />
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
);
