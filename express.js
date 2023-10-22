    const express = require('express')
    const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')
    const cookieParser = require('cookie-parser')
    const cors = require('cors')
    const {User, Product} = require('./mongo')
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


    async function authentificateToken(req, res, next) {
        const token = req.header('Authorization');
        console.log('Received token:', token);
    
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token found' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded.userId).populate('cart.product').exec();
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            req.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                cart: user.cart
            };
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    
    async function onlyAdminAuth(req, res, next) {
        const token = req.header('Authorization');
        console.log('Received token:', token);
    
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token found' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded.userId).exec();
            if (!user || user.isAdmin === false) {
                return res.status(403).json({ message: 'Access denied. Not an admin' });
            }
    
            req.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                cart: user.cart,
            };
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }


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
    

    app.get('/jwt', authentificateToken, (req, res)=>{
        res.status(200).json({user: req.user})
    })
    
    app.post('/addProduct', onlyAdminAuth, async (req, res) => {
        const newProduct = await new Product(req.body)
        newProduct.save().then((res)=>console.log('new Product has been added'))
        res.status(202).json({message: 'new Product has been added'})
    });
    
    app.get('/cart/products', authentificateToken, async (req, res) => {
        try {
            if (!req.user || !req.user.cart || req.user.cart.length === 0) {
                return res.status(200).json({cart: []});
              }
    
            const userCart = req.user.cart;

            // Create an array to hold cart items with product and quantity
            const cart = await Promise.all(
                userCart.map(async (item) => {
                    const product = await Product.findById(item.product);
                    return {
                        product: product,
                        quantity: item.quantity,
                    };
                })
            );
    
            res.status(200).json({ cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    
    

    app.post('/cart/addProduct', authentificateToken, async (req, res) => {
        try {
            const user = await User.findById(req.user._id).exec();
            const productId = req.body.productId
            const foundedProduct = await Product.findById(productId)
            if(!foundedProduct){
                res.status(404).json({message: 'product not found'})
            }

            if(!user.cart || user.cart.length === 0){
                user.cart = []
            }

            const existingProduct = await user.cart.find(item => item.product.equals(productId))
            if(existingProduct){
               existingProduct.quantity++
            }
            else{
                user.cart.push({
                    product: productId,
                    quantity: 1
                })
            }            
       
            // Save the updated user document
           await user.save();

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    
    app.delete('/cart/removeProduct', authentificateToken, async (req, res) => {
        try {
          const user = req.user;
          const productId = req.body.productId;
      
          // Find the index of the product in the user's cart
          const productIndex = user.cart.findIndex((item) => item.product.equals(productId));
      
          if (productIndex !== -1) {
            // Remove the product from the user's cart
            user.cart.splice(productIndex, 1);
            // Save the updated user document to reflect the removal
            await user.save();
            return res.status(204).send('Product removed from the cart');
          } else {
            return res.status(404).json({ message: 'Product not found in the cart' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
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