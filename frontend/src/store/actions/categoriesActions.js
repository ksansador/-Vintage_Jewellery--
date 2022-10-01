import axiosApi from "../../axiosApi";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, payload: categories});
const fetchCategoriesSFailure = error => ({type: FETCH_CATEGORIES_FAILURE, payload: error});

export const fetchCategories = () => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesRequest());

            const response = await axiosApi('/categories');

            dispatch(fetchCategoriesSuccess(response.data));

        } catch (e) {
           dispatch(fetchCategoriesSFailure(e.message));
        }
    }
};
