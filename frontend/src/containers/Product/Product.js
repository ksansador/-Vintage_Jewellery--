import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const Product = () => {
    const product = useSelector(state => state.products.product);
    const dispatch = useDispatch();

    return (
        <div>

        </div>
    );
};

export default Product;