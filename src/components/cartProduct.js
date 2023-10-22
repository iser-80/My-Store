import axios from 'axios';
import React, {useState} from 'react'
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa'

const CartProduct = (props) => {
    let inititalQty = props.cartProduct.quantity
    const [qty, setQty] = useState(inititalQty); // Initialize the quantity to 1 by default
    const product = props.cartProduct.product
    const cartId = props.cartId

    function onQtyChange(e){
        if(e.target.value < 0){
          return 0
        }
        else if(e.target.value > 20){
          return product.quantity
        }
        else{
          setQty(e.target.value)
          props.updateQty(qty)
        }
      }

      async function deleteCartProduct(productId) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.delete('http://localhost:5000/cart/removeProduct', {
            headers: { Authorization: token },
            data: { productId: productId },
          });
      
          if (response.status === 204) {
            props.refreshCart(); // Removed successfully
          } else {
            console.log('Something went wrong on product deletion');
          }
        } catch (error) {
          console.error('Error removing product from the cart:', error);
        }
      }
            

  return (
    <Row className='my-4 d-flex justify-content-center align-items-center' >
        <Col xs={3}>
            <Image src="https://i.pinimg.com/564x/8c/db/e1/8cdbe123010c380e20f264a8fdd57938.jpg" fluid rounded />
        </Col>
        <Col xs={3}>
            <Row><h3>{product.title}</h3></Row>
            <Row>
            <p>{product.description.substring(1, 50)}...</p>
            </Row>
        </Col>
        <Col xs={2}>
            <Form.Control type="number" value={qty} onChange={onQtyChange} />
            
        </Col>
        <Col xs={2}>
            <h2>${product.price * qty}</h2>
        </Col>
        <Col xs={2}>
            <Button onClick={()=>deleteCartProduct(product._id)}><FaTrash/></Button>
            
        </Col>
    </Row>
        
  )
}

export default CartProduct
