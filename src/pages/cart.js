import React, { useState } from 'react';
import { Container, Col, Form, Image, Button, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaLessThan } from 'react-icons/fa'
import CartProduct from '../components/cartProduct';
import CartSummary from '../components/cartSummary';
import { LinkContainer } from 'react-router-bootstrap';

const Cart = () => {

  return (
    <>
      <LinkContainer className='fs-2' style={{margin: '20px 15%' , fontWeight: 'bold'}} to={'/'}>
        <Nav.Link>
          <FaLessThan/> Go Back
        </Nav.Link>
      </LinkContainer>
      <Container className='d-flex justify-content-center'>
        <Col xs={7}>
          <CartProduct />
          <hr className='my-4' style={{ borderColor: 'gray' }}/>
          <CartProduct />
          
        </Col>
        <Col xs={4} className='d-flex flex-column justify-content-start align-items-center m-2'>
           {/* Total Payment */}
            <CartSummary />
        </Col>
      </Container>
    </>
  );
};

export default Cart;
