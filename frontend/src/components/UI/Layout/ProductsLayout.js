import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import AppDrawer from "../AppDrawer/AppDrawer";

const ProductsLayout = ({children}) => {
    return (
        <div>
            <Grid item container justifyContent="space-between" alignItems="center" sx={{ paddingLeft: { sm: '240px'}}}>
                <Grid item>
                    <Typography variant="h5">
                        Products
                    </Typography>
                </Grid>
            </Grid>
            <AppDrawer/>
            <Box sx={{paddingLeft: {sm: '240px'}}}>
                {children}
            </Box>
        </div>
    );
};

export default ProductsLayout;