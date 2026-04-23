const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();

const products = [
  {
    name: 'iPhone 14',
    description: 'Latest iPhone with advanced features',
    price: 999,
    image: 'https://example.com/iphone.jpg',
    category: 'Electronics',
    countInStock: 10,
  },
  {
    name: 'MacBook Pro',
    description: 'Powerful laptop for professionals',
    price: 1999,
    image: 'https://example.com/macbook.jpg',
    category: 'Electronics',
    countInStock: 5,
  },
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => ({ ...product, user: adminUser }));

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}