var crypto = require('crypto');
var mongoose = require('mongoose')
var schema = mongoose.Schema
var Product = mongoose.model('Product')


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
    }
})


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