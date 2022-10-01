import {FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS} from "../actions/productsActions";

const initialState = {
    products: null,
    product: null,
    fetchLoading: false,
    fetchError: null,
};

const productsReducer = ( state = initialState, action) => {
    switch (action.type){
        case FETCH_PRODUCTS_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, fetchLoading: false, products: action.payload};
        case FETCH_PRODUCTS_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};

        default:
            return state;
    }
};

export default productsReducer;