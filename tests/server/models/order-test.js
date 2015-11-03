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
      var createOrder = function () {
          return Order.create(owner: createUser());
      };

	beforeEach("Establish DB connection",function(done){
		if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
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
    			createOrder()
    			.then(function(newOrder){
    				expect(newOrder.email).to.be.equal("obama@gmail.com");
    				expect(newOrder.address).to.be.equal("Wash the DC");
    				done();
    			})
    		})
    	})

    describe("addItem method on the Order instance",function(){
    	it("should find the correct item")


    	it("should call update quantity with correct amount")

    	it("should add the item properly")
    })


    describe("should properly remove Item",function(){
        it("should not have item once deleted",function(done){
            createOrder()
            .then(function(newOrder){
                newOrder.remove
            })
        })
    })
  











})
