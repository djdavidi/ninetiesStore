'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    vendorProducts: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        type: String
    },
    picture: {
        type: String,
        default: "http://www.fillmurray.com/140/100"
    },
    rating: {
        type: Number
    },
    cart: [{
        quantity: Number,
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

userSchema.methods.addProduct = function (productData) {
    var self = this;
    return Product.create(productData)
    .then(function (product) {
        self.vendorProducts.addToSet(product._id);
        return self.save();
    });
}

userSchema.methods.removeProduct = function (product) {
    var self = this;
    return product.remove()
    .then(function () {
        self.vendorProducts.pull(product);
        return self.save();
    });
}


// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);