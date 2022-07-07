const URL = "/products.json";

export const getProducts = async() => {
    const response = await fetch(URL);
    const data = await response.json();

    return data;
};