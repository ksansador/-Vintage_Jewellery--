import React from 'react';
import ProductsLayout from "../../components/UI/Layout/ProductsLayout";
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const Products = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.products.fetchLoading);
    const products = useSelector(state => state.products.products);
    const query = useLocation().search;

    useEffect(() => {
        dispatch(fetchProducts(query));
    }, [dispatch, query]);

    return (
        <Grid container direction="column" spacing={2}>>
            <ProductsLayout/>
        </Grid>
    );
};

export default Products;