    const express = require('express')
    const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')
    const cookieParser = require('cookie-parser')
    const cors = require('cors')
    const {User, Product, Cart} = require('./mongo')
    const { useParams } = require('react-router-dom')
    require('dotenv').config()

    const app = express()
    
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.SECRET_KEY))

    app.use(
        cors({
            origin: 'http://localhost:3000', // Update with your frontend's origin
            credentials: true,
        })
    );


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
        try {
            const {email, password, name} = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({ email, password: hashedPassword, name });

            await user.save()

            const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})

            res.status(201).json({message: 'User registered successfully', token})
        } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    })

    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const foundUser = await User.findOne({ email });

            if (foundUser) {
                const matchPassword = await bcrypt.compare(password, foundUser.password);
                if (matchPassword) {
                    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    
                    res.status(200).json({ message: 'login successfully', token });
                } else {
                    res.status(401).json({ message: 'incorrect password' });
                }
            } else {
                res.status(404).json('user not found');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error');
        }
    });

    
    async function authentificateToken(req, res, next) {
        const token = req.header('Authorization');
        console.log('Received token:', token);
    
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token found' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Decoded token:', decoded);
    
            const user = await User.findById(decoded.userId).exec();
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            req.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
            };
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    
    

    app.get('/jwt', authentificateToken, (req, res)=>{
        res.status(200).json({data: 'todos et bien', user: req.user})
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