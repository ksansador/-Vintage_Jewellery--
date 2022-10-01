import {
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
    categories: [],
    fetchLoading: false,
    fetchError: null,
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return { ...state , fetchLoading: true, fetchError: null };
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload, fetchLoading: false };
        case FETCH_CATEGORIES_FAILURE:
            return  { ...state, fetchLoading: false, fetchError: action.payload };
        default:
            return state;
    }
};

export default categoriesReducer;