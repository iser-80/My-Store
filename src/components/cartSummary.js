import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';

const CartSummary = (props) => {
  //const [cart, setCart] = useState([])
  const cart = props.cart
  console.log(cart)

  return (
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
          <p style={{fontSize: '18px'}}>$ {item.product.price}</p>
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

    <Button variant='outline-warning' size='lg' className='mt-4 fs-4' style={{width: '97%'}}>Checkout</Button>
    
  </Container>
  )
}

export default CartSummary
