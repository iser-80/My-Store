import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap'
import {FaTrash} from 'react-icons/fa'

const Product = (props) => {
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

  async function addToCart () {
    try {
      if(user){
        await axios.post('http://localhost:5000/cart/addProduct', { productId: props.id }, { headers: { 'Authorization': token } })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card style={{ width: '16rem' }}>
        <LinkContainer to={`/products/${props.id}`}>
          <Nav.Link>
            <Card.Img variant="top" src="https://img.freepik.com/psd-premium/gros-plan-maquette-ordinateur-portable-flottant_308775-6.jpg" />
          </Nav.Link>
        </LinkContainer>
        <Card.Body>
          <LinkContainer to={`/products/${props.id}`}>
            <Nav.Link>
              <Card.Title>{props.title}</Card.Title>
            </Nav.Link>
          </LinkContainer>
          <Card.Text>{props.description.substring(1, 70)} ...</Card.Text>
          <Button type='submit' onClick={addToCart} variant="primary" disabled={!user}>Add to Cart</Button>
          {(user && user.isAdmin) && 
            <Button onClick={props.removeProduct} style={{marginLeft: '2rem'}} type='submit' variant="danger"><FaTrash/></Button>
          }
        </Card.Body>
    </Card>
  )
}

export default Product
