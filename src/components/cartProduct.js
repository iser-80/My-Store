import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa'

const CartProduct = (props) => {
    let inititalQty = props.cartProduct.quantity
    const [qty, setQty] = useState(inititalQty); // Initialize the quantity to 1 by default
    const product = props.cartProduct.product
    const cartId = props.cartProduct.cart._id
    console.log('about cart', props.cartProduct)
    console.log(product.quantity)

    const [user, setUser] = useState(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
      if (token) {
        try {
          // Fetch user information using the token
          axios
            .get('http://localhost:5000/jwt', { headers: { 'Authorization': token } })
            .then((res) => {
              setUser(res.data.user);
              console.log(res.data.user)
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }, [token]);

    async function onQtyChange(e) {
      if (e.target.value < 0) {
        return 0;
      } else if (e.target.value > product.quantity) {
        return product.quantity;
      } else {
        try {
          const newQty = e.target.value;
          const response = await axios.patch(
            'http://localhost:5000/cart/updateQty',
            {
              cartId: cartId,
              newQty: newQty,
            },
            {
              headers: {
                'Authorization': token,
              },
            }
          );
        
          if (response.status === 200) {
            setQty(newQty);
            props.updateQty(newQty);
          } else {
            console.log('Something went wrong on product quantity update');
          }
        } catch (error) {
          console.log('Error updating product quantity:', error);
        }
        
      }
    }
    
    

      async function deleteCartProduct() {
        try {
          if(user){
            const response = await axios.delete('http://localhost:5000/cart/removeProduct', {
              headers: { 'Authorization': token },
              data: { cartId },
            });
            if (response.status === 204) {
              props.refreshCart(); // Removed successfully
            } else {
              console.log('Something went wrong on product deletion');
            }
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
            <Button onClick={()=>deleteCartProduct()}><FaTrash/></Button>
            
        </Col>
    </Row>
        
  )
}

export default CartProduct
