const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {User, Product, Cart} = require('./mongo')
const { useParams } = require('react-router-dom')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/data', async (req, res)=>{
    try {
        const productsData = await Product.find()
        res.status(200).json(productsData)
    } catch (error) {
        console.log('somthing went wrong : ', error)
    }
})

app.get('/products/:productId', async (req, res)=>{
    const productId = req.params.productId

    try {
        const foundedProduct = await Product.findOne({ _id: productId })
        console.log(foundedProduct)
        if(foundedProduct){
            res.status(200).json(foundedProduct)
        }else{
            res.status(404).json({message: 'product not found'})
        }
    } catch (error) {
        console.log(error)
    }
    
})

app.post('/register', async(req, res)=>{
    const user = new User(req.body)
    user.save().then((res)=>console.log('new user added'))
    res.status(200).json({ message: "POST request received successfully" });
})

app.post('/login', async(req, res)=>{
    const {email, password} = req.body

    console.log(email)
    try {
        const existUser = await User.findOne({ email })
        if(existUser){
            res.status(200).json('found')
        }else{
            res.status(404).json('notFound')
        }
    } catch (error) {
        
        res.status(500).json("Internal Server Error");
    }
})

app.post('/addProduct', async (req, res) => {
    const newProduct = await new Product(req.body)
    newProduct.save().then((res)=>console.log('new Product has been added'))
    res.status(202).json({message: 'new Product has been added'})
});
  
app.get('/cart/products', async (req, res) => {
    try {
        const products = await Cart.find().populate('product', 'title description price');
        if(products){
            res.status(200).json(products)
        }
        else{
            res.status(404).send('sorry no products found in the cart')
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/cart/addProduct', async (req, res) => {
    try {
      const productId = req.body.productId; // Get the product ID from the request body
      const product = await Product.findById(productId)
      const cartProduct = new Cart({ product: product, quantity: 1 }); // Create a new cart item
      await cartProduct.save();
      console.log('New product added to the cart:', cartProduct);
      res.status(202).json({ message: 'New product has been added to the cart' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  app.delete('/cart/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const result = await Cart.deleteOne({ _id: cartId }); // Use _id to find the cart item
        if (result.deletedCount > 0) {
            res.status(204).send('Cart item deleted successfully');
        } else {
            res.status(404).send('Cart item not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});






app.listen(5000, console.log('port 5000 connected'))