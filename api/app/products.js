const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const query = {};

    if(req.query.category) {
        query.category = req.query.category;
    }

    try {
        const products = await Product
            .find(query)
            .populate('category', 'title description')
            .populate('user', 'displayName phone');

        res.send(products);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).send({message: 'Product not found!'});
        }

        res.send(product);
    } catch {
        res.sendStatus(500);
    }
});


router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const {title, price, category, description, image} = req.body;

        if (!title || !category || !description || !image ) {
            return res.status(400).send({error: 'Data not valid!'});
        }

        const productData = {
            title,
            price,
            category,
            description: description || null,
            image: null,
        };

        if (req.file) {
            productData.image = 'uploads/' + req.file.filename;
        }

        const product = new Product(productData);
        await product.save();

        res.send(product);
    }catch (e) {
        res.status(400).send({error: e.errors});
    }

});

router.delete('/:id', auth, async (res, req) => {
   const user = req.user;

    try {
       const response =  await Product.deleteOne({_id: req.params.id, user: user._id});

       if( response['deletedCount']) {
          res.send('Success');
      } else {
          res.status(400).send({error: 'Deleted failed'});
      }

    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;