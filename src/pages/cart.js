import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Button, Toast } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import {FaLessThan } from 'react-icons/fa'
import CartProduct from '../components/cartProduct';
import CartSummary from '../components/cartSummary';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([])
  const [qty, setQty] = useState(0)

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/cart/products', {
          headers: {
            Authorization: token,
          },
        });
        setCart(response.data.cart);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };    
  
    fetchCartProducts();
  }, []);
  

  const refreshCart = () => {
    axios.get('http://localhost:5000/cart/products').then((res) => {
      setCart(res.data.cart);
    });
  };

  const updateQty = (newQty) => {
    setQty(newQty)
  }


  return (
    <>
      <LinkContainer className='fs-2' style={{margin: '20px 15%' , fontWeight: 'bold'}} to={'/'}>
        <Nav.Link>
          <FaLessThan/> Go Back
        </Nav.Link>
      </LinkContainer>
      <Container className='d-flex justify-content-center'>

        {/* Cart Product */}
        <Col xs={8}>
        {Array.isArray(cart) && cart.length === 0  ? (
          <p>you cart is empty</p>
        ) : (
          console.log('Cart:', cart),
          cart.map((item) => (
            <CartProduct key={item._id} refreshCart={refreshCart} updateQty={updateQty} cartProduct={item} cartId={item._id} />
          ))
        )}
        </Col>

        {/* Cart Summary */}
        <Col xs={4} className='d-flex flex-column justify-content-start align-items-center m-2'>
        <Container className='m-2  border border-gray rounded p-4' >
          <Row>
            <h1 style={{textAlign: 'center'}}>Summary</h1>
          </Row>
          <Row>
            <p style={{color: '#FFCD4B', textAlign: 'center'}}>Select your orders and get them now!</p>
          </Row>

          {cart.map((item) => (
            <Row className='mt-3'>
              <Col xs={8}>
                <p style={{fontSize: '18px', marginLeft: '20px'}}>{item.product.title.substring(0, 10)}</p>
              </Col>
              <Col xs={4}>
                <p style={{fontSize: '18px'}}>$ {item.product.price * item.quantity}</p>
              </Col>
            </Row>
          ))}
          
          <Row className='mt-4'>
            <Col xs={8}>
              <h4 style={{marginLeft: '20px'}}>Total Price</h4>
            </Col>
            <Col xs={4}>
              <h4 style={{color: '#FFCD4B'}}>$539</h4>
            </Col>
          </Row>

          <Button onClick={()=>console.log(qty)} variant='outline-warning' size='lg' className='mt-4 fs-4' style={{width: '97%'}}>Checkout</Button>
          
        </Container>
        </Col>
      </Container>
    </>
  );
};

export default Cart;