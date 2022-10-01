const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [ringsCategory, earringsCategory, pendantCategory] = await Category.create({
        title: 'Rings',
        description: 'Vintage Rings',
    }, {
        title: 'Earrings',
        description: 'Vintage earrings',
    },{
        title: 'Pendants',
        description: 'Vintage pendants',
    });

   const [adminUser, rootUser, ksansaUser] = await User.create({
        username: 'admin',
        password: 'admin',
         displayName: 'Admin',
       phone: '555-555-777',
        token: nanoid(),
    }, {
        username: 'root',
        password: 'root',
        displayName: 'Root',
        phone: '555-555-444',
        token: nanoid(),
    }, {
        username: 'ksansa',
        password: 'ksansa',
        displayName: 'Ksansa',
        phone: '555-555-444',
        token: nanoid(),
    });

    await Product.create({
        title: "Amrita ring",
        price: 300,
        description: 'rings for everyday',
        user: adminUser._id,
        category: ringsCategory._id,
        image: 'fixtures/a.jpg',
    }, {
        title: "Jade earrings",
        price: 150,
        user: rootUser._id,
        description: 'Earring for everyday',
        category: earringsCategory._id,
        image: 'fixtures/b.jpg',
    }, {
        title: "NECKLACES",
        price: 400,
        user: ksansaUser._id,
        description: 'pedants for everyday',
        category: pendantCategory._id,
        image: 'fixtures/c.jpg',
    }, {
        title: "Lavender",
        price: 300,
        user: ksansaUser._id,
        description: 'Lavender Pendant — Claus Jewelry',
        category: pendantCategory._id,
        image: 'fixtures/d.jpg',
    }, {
        title: "Sun and Moon",
        price: 300,
        user: ksansaUser._id,
        description: 'Pair of rings',
        category: ringsCategory._id,
        image: 'fixtures/i.jpg',
    });



    await mongoose.connection.close();
};

run().catch(console.error);