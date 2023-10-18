import React, { useEffect, useState } from 'react';
import { Container, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import {FaLessThan } from 'react-icons/fa'
import CartProduct from '../components/cartProduct';
import CartSummary from '../components/cartSummary';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/cart/products').then((res) => {
      setCart(res.data)
      console.log(res.data)
    })
  }, [])

  const refreshCart = () => {
    axios.get('http://localhost:5000/cart/products').then((res) => {
      setCart(res.data);
    });
  };

  return (
    <>
      <LinkContainer className='fs-2' style={{margin: '20px 15%' , fontWeight: 'bold'}} to={'/'}>
        <Nav.Link>
          <FaLessThan/> Go Back
        </Nav.Link>
      </LinkContainer>
      <Container className='d-flex justify-content-center'>
        <Col xs={8}>
          {cart.map((item) => (
            <CartProduct key={item._id} refreshCart={refreshCart} cartProduct={item} cartId={item._id} />
          ))}
        </Col>
        <Col xs={4} className='d-flex flex-column justify-content-start align-items-center m-2'>
           {/* Total Payment */}
            <CartSummary cart={cart}/>
        </Col>
      </Container>
    </>
  );
};

export default Cart;
