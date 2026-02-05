export const buildQueryParams = (page,filterForm) => {
    const params = new URLSearchParams({ page });

    Object.entries(filterForm).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    return params.toString();
};