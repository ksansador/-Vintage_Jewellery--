import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, payload: products});
const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_FAILURE, payload: error});

const fetchProductRequest = () => ({type: FETCH_PRODUCT_REQUEST});
const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, payload: product});
const fetchProductFailure = error => ({type: FETCH_PRODUCT_FAILURE, payload: error});

const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
const deleteProductFailure = error => ({type: DELETE_PRODUCT_FAILURE, payload: error});

export const fetchProducts = (query) => {
    return async (dispatch) => {
        try {
            dispatch(fetchProductsRequest());

            const response = await axiosApi('/products' + query);

            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {

            dispatch(fetchProductsFailure(e.message));
        }
    };
};

export const fetchProduct = id => {
    return async dispatch => {
        try {
            dispatch(fetchProductRequest());

            const response = await axiosApi('/products/' + id);

            dispatch(fetchProductSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductFailure(e.message));
        }
    };
};

export const deleteProduct = id => {
    return async dispatch => {
    try {
        dispatch(deleteProductRequest());

        await axiosApi.delete('/products/' + id);
         dispatch(deleteProductSuccess());
         dispatch(historyPush('/'));
    } catch (e) {
        dispatch(deleteProductFailure(e));
    }
    };
};