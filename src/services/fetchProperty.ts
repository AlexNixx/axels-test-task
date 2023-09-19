export const fetchPropertyFromApi = async (id: number) => {
    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}?id=${id}`
    );
    if (!response.ok) {
        throw new Error('Could not download the data');
    }
    return await response.json();
};
