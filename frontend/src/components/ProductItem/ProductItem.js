import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Card, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {apiUrl} from "../../config";

const ProductItem = ({id, title, price, image}) => {
  let cardImage;

  if (image) {
    cardImage = apiUrl + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title} sx={{color: '#34410e', textTransform: 'capitalize'}}/>
        {image? <CardMedia
            title={title}
            image={cardImage}
            sx={{paddingTop: '70.25%', height: 0}}
        />
        : <ImageNotSupportedIcon fontSize={'large'} sx={{margin: '100px', width: '100px'}}/>
        }
        <CardContent >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <strong style={{color: '#405702'}}>
              Price: {price} KGS
            </strong>
            <IconButton component={Link} to={'/products/' + id}>
              <ArrowForward />
            </IconButton>
          </div>

        </CardContent>

      </Card>
    </Grid>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string
};

export default ProductItem;