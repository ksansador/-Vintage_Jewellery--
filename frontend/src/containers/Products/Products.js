import React, {useEffect} from 'react';
import ProductsLayout from "../../components/UI/Layout/ProductsLayout";
import {Box, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchProducts} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

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
            <ProductsLayout>
                {loading
                    ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                    : <Grid item container spacing={3}>
                        { products? products.map(product => (
                            <ProductItem
                                key={product._id}
                                id={product._id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        )) :
                            <Box sx={{textAlign: 'center'}}>There are no products ...</Box>
                        }
                    </Grid>
                }
            </ProductsLayout>
        </Grid>
    );
};

export default Products;