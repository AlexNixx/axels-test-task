import { useLocation } from 'react-router-dom';

export const ShowLocation = () => {
    const location = useLocation();

    return <div data-testid='locationDisplay'>{location.pathname}</div>;
};
