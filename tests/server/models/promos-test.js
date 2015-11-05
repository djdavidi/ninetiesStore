var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var User = mongoose.model('User')
var Product = mongoose.model('Product');
var Promo = mongoose.model('Promo');

describe('Promo Model', function() {
	var createUser = function () {
          return User.create({ email: 'obama@gmail.com', password: 'potus', address: "Wash the DC"});
      };
      var createOrder = function (id) {
          return Order.create({owner: id});
      };


	beforeEach("Establish DB connection",function(done){
		if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
        
        var newUser = createUser();
        var newOrder = createOrder(newUser._id);

        var createdProduct=function () {
            return Product.create({
                title:"delorean",
                price:5,
                date:Date.now(),
                description:"badass",
                quantity:"ninety",
                rating:5,
                category:["car","time-machine"]
            });
        }();


	})
	  afterEach('Clear test database', function (done) {
        clearDB(done);
    });

	it('should exist', function() {
		expect(Promo).to.be.a('function')
	})

})