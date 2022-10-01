import axiosApi from "../../axiosApi";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';


const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, payload: products});
const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_FAILURE, payload: error});


export const fetchProducts = (query) => {
    return async (dispatch) => {
        try {
            dispatch(fetchProductsRequest());

            const response = await axiosApi('/products' + query);

            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {

            dispatch(fetchProductsFailure(e.message));
        }
    }
};
