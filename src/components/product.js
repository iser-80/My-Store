import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap'

const Product = (props) => {


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
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
    </Card>
  )
}

export default Product
