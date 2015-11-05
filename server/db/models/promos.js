var crypto = require('crypto');
var mongoose = require('mongoose')
var schema = mongoose.Schema
var Product = mongoose.model('Product')

var querySchema = new schema({
	title: {
        type: String
    },
    price: {
        type: Number
    },
    date: {
        type: Date
    },
    productRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    category: [{
        type: String,
        required: true
    }]
})


var promoSchema = new schema({
	name: {
		type: String,
		required: true
	},
	promoCode: {
		type: String
	},
	salt: {
        type: String
    },
    percentDiscount: {
    	type: Number,
    	min: 0,
    	max: 100,
    	required: true
    },
    expiration: {
    	type: Date,
        validate: {
            validator: function() {
                return Date.now() > this.expiration
            },
            message: 'This promo has expired.'
        }
    },
    query: querySchema
})

// promoSchema.methods.applyPromo = function(productQuery) {
// 	var self = this
// 	Product.find(productQuery).exec()
// 	.then(function(products) {
// 		products.forEach(function(product) {
// 			product.price = self.percentDiscount/100;
// 			product.promo = self._id
// 			return product.save()
// 		})
// 	})
// }

// promoSchema.methods.removePromo = function(promo) {
// 	var self = this
// 	Product.find({promo: promo}).exec()
// 	.then(function(products) {
// 		products.forEach(function(product) {
// 			product.price = 100/self.percentDiscount;
// 			product.promo.remove()
// 			return product.save()
// 		})
// 	})
// }

promoSchema.getPromoProducts = function(query) {
    Product.find(query).exec()
    .then(function(products) {
        return products
    })
}

var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptpromoCode = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

promoSchema.pre('save', function (next) {

    if (this.isModified('promoCode')) {
        this.salt = this.constructor.generateSalt();
        this.promoCode = this.constructor.encryptpromoCode(this.promoCode, this.salt);
    }

    next();

});

promoSchema.statics.generateSalt = generateSalt;
promoSchema.statics.encryptpromoCode = encryptpromoCode;

promoSchema.method('correctpromoCode', function (candidatepromoCode) {
    return encryptpromoCode(candidatepromoCode, this.salt) === this.promoCode;
});

mongoose.model('Promo', promoSchema)