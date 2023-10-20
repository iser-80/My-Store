const mongoose =  require("mongoose");

mongoose.connect("mongodb://localhost/EcomDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log("mongo connection is done");
});

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false   
    }
})

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
})

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }, 
    quantity: {
        type: Number,
        default: 1
    }
})

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Cart = mongoose.model('Cart', cartSchema)

module.exports = {User, Product, Cart}

