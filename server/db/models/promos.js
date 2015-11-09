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
	}, //removed Salt
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
    promoCodeDigits: {
        type: Number
    }
})


var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptpromoCode = function (plainText) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    // hash.update(salt);
    return hash.digest('hex');
};

promoSchema.pre('save', function (next) {
    this.promoCodeDigits = Math.floor((Math.random()*999999)+1);

    // if (this.isModified('promoCode')) {
        // this.salt = this.constructor.generateSalt();
        this.promoCode = this.constructor.encryptpromoCode(this.promoCodeDigits.toString());
    // }

    next();

});

promoSchema.statics.generateSalt = generateSalt;
promoSchema.statics.encryptpromoCode = encryptpromoCode;

promoSchema.method('correctpromoCode', function (candidatepromoCode) {
    return encryptpromoCode(candidatepromoCode) === this.promoCode;
});

mongoose.model('Promo', promoSchema)