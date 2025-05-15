import { baseUrl } from '../../util/constants';

export const fetchCatchStats = async ({
    year,
    month,
    page,
    pageSize,
    ordering,
}) => {
    const params = new URLSearchParams({
        year,
        month,
        page,
        pageSize,
        ordering,
    });

    return await fetch(`${baseUrl}/catch_history/?${params.toString()}`);
};

export const createCatchStats = async (payload) => {
    return await fetch(`${baseUrl}/catch_history/create/`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
    });
};
