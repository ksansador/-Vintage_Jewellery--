import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, fetchProduct} from "../../store/actions/productsActions";
import {Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const Product = ({match}) => {
    const product = useSelector(state => state.products.product);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    let  button;

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);


    if(product && user) {
        if(product.user._id === user._id) {
            button = <Button
                sx={{
                    alignSelf: 'right',
                    margin: '10px 0',
                    color: '#98a66e',
                    border: '1px solid #98a66e'
            }}

                onClick={() => dispatch(deleteProduct(product._id))}> delete product </Button>
        }
    }
    return (
        product &&
        <Grid item xs={12} >
            <Card sx={{height: '100%', padding: '0 15px'}}>
                <CardHeader title={product.title} sx={{textTransform: "capitalize", color: '#34410e'}}>
                </CardHeader>

                <CardContent>
                    <CardMedia
                        title={product.title}
                        image={`${apiUrl}/${product.image}`}
                        sx={{paddingTop: '30%', maxWidth: '30%', height: 0, margin: '0 auto'}}
                    />
                    <Typography variant={"h5"} sx={{textAlign: 'center'}}>
                        {product.title}
                        <Typography sx={{ margin: '0 10px'}}>
                            {product.description}
                        </Typography>
                        <Typography  style={{margin: '0' }}>
                            <i>Price: {product.price}</i>
                        </Typography>
                    </Typography>


                    <Typography component={'p'}>
                         {product.user.displayName}
                    </Typography>
                     <Typography component={'p'}>
                      Phone: {product.user.phone}
                     </Typography>
                    {button}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Product;