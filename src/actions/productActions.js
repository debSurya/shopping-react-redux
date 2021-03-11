import { FETCH_PRODUCTS } from "../types";

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
        payload: data
    });
}