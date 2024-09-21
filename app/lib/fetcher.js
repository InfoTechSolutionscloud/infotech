const public_fetcher = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export default public_fetcher;