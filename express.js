const express = require('express')
const cors = require('cors')
const User = require('./mongo')
const Product = require('./mongo')
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
  


app.listen(5000, console.log('port 5000 connected'))