import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import usersReducer from "./reducers/usersReducer";
import productsReducer from "./reducers/productsReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import thunk from "redux-thunk";
import axiosApi from "../axiosApi";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    users: usersReducer,
    products: productsReducer,
    category: categoriesReducer,
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users,
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {

    }
    return config;
});

export default store;