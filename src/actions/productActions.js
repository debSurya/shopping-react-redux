import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch('http://localhost:8899/data.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data.products
    });
};

export const filterProducts = (products, size) =>
    (dispatch) => dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size,
            items: size === '' ? products :
                (products.filter((item) => item.availableSizes.indexOf(size) >= 0))
        }
    });

export const sortProducts = (filteredProducts, sort) =>
    (dispatch) => {
        const sortedProducts = filteredProducts.slice();
        if (sort === '') {
            sortedProducts.sort((a, b) => (a._id > b._id) ? 1 : -1);
        } else {
            sortedProducts.sort((a, b) => {
                if (sort === 'lowest') {
                    return a.price > b.price ? 1 : -1;
                } else {
                    return a.price < b.price ? 1 : -1;
                }
            });
        }
        dispatch({
            type: ORDER_PRODUCTS_BY_PRICE,
            payload: {
                sort,
                items: sortedProducts
            }
        });
    };