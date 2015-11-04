'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model("Order");

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({ email: email })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                req.session.cart = req.session.cart || [];
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                Order.find({owner:req.user._id,status:"Created"})
                .then(function(currentOrder){
                    if(!currentOrder){
                        Order.create({owner:req.user._id})
                        .then(function(newOrder){
                            req.session.cart.forEach(function(elem){
                            newOrder.addItem(elem)
                            })
                        })
                    }
                     if(currentOrder){
                        console.log("TTTTTTTTTTTTTTT",currentOrder);
                        req.session.cart.forEach(function(elem){
                        currentOrder.addItem(elem)
                        })
                        req.session.cart=[];
                    }
                

                // },function(err){
                //     Order.create({owner:req.user._id})
                //     .then(function(newOrder){
                //         req.session.cart.forEach(function(elem){
                //         newOrder.addItem(elem)
                //         })
                //     })
                //     req.session.cart=[];
                //      console.log("TTTTTTTTTTTTTTT",newOrder);
                })
                .then(function(){
                    res.status(200).send({
                        user: _.omit(user.toJSON(), ['password', 'salt'])
                    });  
                })
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

};
