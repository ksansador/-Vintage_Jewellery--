import React from 'react';
import {Box} from "@mui/material";
import AppDrawer from "../AppDrawer/AppDrawer";

const ProductsLayout = ({children}) => {
    return (
        <div>
            <AppDrawer/>
            <Box sx={{paddingLeft: {sm: '240px'}}}>
                {children}
            </Box>
        </div>
    );
};

export default ProductsLayout;