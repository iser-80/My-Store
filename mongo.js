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
    passowrd: {
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

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)

module.exports = User
module.exports = Product