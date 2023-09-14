import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages';
import { PropertyPage } from './pages';
import { NotFoundPage } from './pages';

export const Routing = () => (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/property/:id' element={<PropertyPage />} />
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
);
