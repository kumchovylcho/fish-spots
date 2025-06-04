import { baseUrl } from '../../util/constants';

export const fetchOldestCatchYear = async () => {
    return await fetch(`${baseUrl}/catch-history/oldest-catch-year/`, {
        credentials: 'include',
    });
};

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

    return await fetch(`${baseUrl}/catch-history/?${params.toString()}`, {
        credentials: 'include',
    });
};

export const createCatchStats = async (payload) => {
    return await fetch(`${baseUrl}/catch-history/create/`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
    });
};

export const deleteCatchStat = async (id) => {
    return await fetch(`${baseUrl}/catch-history/delete/${id}/`, {
        method: 'DELETE',
        credentials: 'include',
    });
};
