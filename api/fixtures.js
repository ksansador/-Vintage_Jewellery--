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
        title: 'earrings',
        description: 'Vintage earrings',
    },{
        title: 'Pendants',
        description: 'Vintage pendants',
    });

   const [adminUser, rootUser] = await User.create({
        username: 'admin',
        password: 'admin',
         displayName: 'Admin',
       phone: '+996 555 555 777',
        token: nanoid(),
    }, {
        username: 'root',
        password: 'root',
       displayName: 'Root',

       phone: '+996 555 555 444',
        token: nanoid(),
    });

    await Product.create({
        title: "Amrita singh ring",
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
    });



    await mongoose.connection.close();
};

run().catch(console.error);