import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {createProduct} from "../../store/actions/productsActions";
import {Typography} from "@mui/material";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {Redirect} from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";

const NewProducts = ({history}) => {
    const user  = useSelector( state => state.users.user);
    const categories = useSelector(state => state.category.categories);
    const errors = useSelector(state => state.products.createError);
    const dispatch = useDispatch();

    console.log(errors);
    useEffect( () => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if(!user) {
        toast.warn('You need login!', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return <Redirect to="/login"/>
    }

    const onProductFormSubmit = async productData => {
        await dispatch(createProduct(productData));
        history.push("/");
    };

    return (
        <div>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                Add product
            </Typography>
            <ProductForm
                error={errors}
                onSubmit={onProductFormSubmit}
                categories={categories}
            />
        </div>
    );
};

export default NewProducts;