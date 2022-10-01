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
        const product = await Product.findById(req.params.id)
            .populate('user category');

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

        const user = req.user;

        const {title, price, category, description, image} = req.body;

        if (!title || !category || !description || !image ) {
            return res.status(400).send({error: 'Data not valid!'});
        }

        const productData = {
            title,
            price,
            category,
            user: user._id,
            description,
            image,
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

router.delete('/:id', auth, async (req, res) => {
   const user = req.user;
    const productId = req.params.id;

    try {
            const response =  await Product.deleteOne({_id: productId, user: user._id});

            if( response['deletedCount']) {
                res.send('Success');
            } else {
                res.status(403).send({error: 'Deleted failed'});
            }

    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;