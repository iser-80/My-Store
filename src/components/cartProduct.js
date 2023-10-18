import React, {useState} from 'react'
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa'

const CartProduct = () => {
    const [qty, setQty] = useState(10); // Initialize the quantity to 1 by default

  return (
    <Row className='my-4 d-flex justify-content-center align-items-center' >
        <Col xs={3}>
            <Image src="https://i.pinimg.com/564x/8c/db/e1/8cdbe123010c380e20f264a8fdd57938.jpg" fluid rounded />
        </Col>
        <Col xs={3}>
            <Row><h3>Product Title</h3></Row>
            <Row>
            <p>Webdesign UI shopping cart designed by Koi Thunyarat.</p>
            </Row>
        </Col>
        <Col xs={2}>
            <Form.Control
                as='select'
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))} // Update quantity when selected
            >
                {[...Array(qty).keys()].map((x)=>(
                    <option key={x+1} value={x+1}>
                        {x + 1}
                    </option>
                ))}
            </Form.Control>              
        </Col>
        <Col xs={2}>
            <h2>$120</h2>
        </Col>
        <Col xs={2}>
            <FaTrash />
        </Col>
        </Row>
  )
}

export default CartProduct
