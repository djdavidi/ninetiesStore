var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');
var User = mongoose.model("User");
var Review = mongoose.model('Review');
var Product = mongoose.model('Product');

describe("Product model",function(){
     
beforeEach(function(){
      var createdUser = function() {
         return User.create({ email: 'obama@gmail.com', password: 'potus', address: "Wash the DC"});
      };
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
      };
})

    var reviewData = {
            title:"badddasss",
            user: createdUser._id,
            product: createdProduct._id,
            rating:4,
            content:"to infinity and beyond"
        }
	beforeEach("Establish DB connection",function(done){
		if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
	})
	  afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });
})
