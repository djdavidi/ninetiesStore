var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var User = mongoose.model('User');
var Product = mongoose.model('Product');

describe("Order model",function(){
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

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe("pre save hook for User's email and address fills in correctly",
    	function(){

    		it("should have the User's valid email",function(done){
				expect(newOrder.email).to.be.equal("obama@gmail.com");
				expect(newOrder.address).to.be.equal("Wash the DC");
    		})
    	})

    describe("addItem method on the Order instance",function(){
    	it("should find the correct item", function (done) {
            newOrder.addItem(createdProduct._id, 1)
            .then(function (product) {
                expect(newOrder.storedItems.contains(product)).to.be.equal(true);
                done();
            })
            .then(null, done)
        })
    })


    describe("removeItem should properly remove Item",function(){
        it("should not have item once deleted",function (done){
            newOrder.removeItem(createdProduct._id)
            .then(function () {
                expect(newOrder.storedItems.contains(createdProduct)).to.be.equal(false);
                done();
            })
            .then(null, done)
        })
    })
})
