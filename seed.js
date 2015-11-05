/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');

var User = Promise.promisifyAll(mongoose.model('User'));
// var Order = Promise.promisifyAll(mongoose.model('Order'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

var usersData = JSON.parse(fs.readFileSync('./seed_data/user_data.json'));
// var ordersData = JSON.parse(fs.readFileSync('./seed_data/order_data.json'));
var productsData = JSON.parse(fs.readFileSync('./seed_data/product_data.json'));
// var reviewsData = JSON.parse(fs.readFileSync('./seed_data/review_data.json'));

var seedUsers = function () {
    return User.createAsync(usersData);
};
// var seedOrders = function () {
//     return Order.createAsync(ordersData);
// };
var seedProducts = function () {
    return Product.createAsync(productsData);
};
// var seedReviews = function () {
//     return Review.createAsync(reviewsData);
// };

connectToDb.then(function () {
    User.remove({})
    // .then(function () {
    //     return Order.remove({})
    }).then(function () {
        return Product.remove({})
    }).then(function () {
        return Review.remove({})
    }).then(function () {
        console.log("Database cleared. Initiating seed of database.")
    }).then(function () {
        return seedUsers();
    // }).then(function () {
    //     return seedOrders();
    }).then(function () {
        return seedProducts();
    // }).then(function () {
    //     return seedReviews();
    }).then(function () {
        console.log("Database successfully seeded");
        process.exit(0);
    }).catch(function (err) {
        console.log(err);
        process.exit(1);
    });








// ORIGINAL CODE BELOW
// var seedUsers = function () {

//     var users = [
//         {
//             email: 'testing@fsa.com',
//             password: 'password'
//         },
//         {
//             email: 'obama@gmail.com',
//             password: 'potus'
//         }
//     ];

//     return User.createAsync(users);

// };

// connectToDb.then(function () {
//     User.findAsync({}).then(function (users) {
//         if (users.length === 0) {
//             return seedUsers();
//         } else {
//             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function () {
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });
