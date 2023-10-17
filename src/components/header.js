import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Button, Row } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import {FaShoppingCart, FaShoppingBag } from 'react-icons/fa'


const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand href="/" className='fs-4'><FaShoppingCart/> Electro-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/addProduct">Add Product</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Row>
          <Col xs="auto">
            <LinkContainer to={'/login'}>
              <Nav.Link>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Nav.Link>
            </LinkContainer>
          </Col>
          <Col xs="auto">
            <LinkContainer to={'/register'}>
              <Nav.Link>
                <Button variant="outline-secondary" type="submit">
                  Register
                </Button>
              </Nav.Link>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
      
    </Navbar>
  )
}

export default Header
