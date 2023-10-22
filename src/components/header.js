import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Col, Button, Row, Nav, Navbar } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import {LinkContainer} from 'react-router-bootstrap'
import {FaShoppingCart, FaShoppingBag } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null)
  const token = localStorage.getItem('token')


  useEffect(()=>{
    if(token){
      try {
        axios.get('http://localhost:5000/jwt', {headers: {'Authorization': token}}).then((res)=>{
        setUser(res.data.user)
        console.log(res.data.user)
      })
      } catch (error) {
        console.log('axios error : ', error)
      }
    }
  }, [token])

  function handleLogOut(){
    localStorage.removeItem('token')
    window.location.href = '/'; 
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>

        <Navbar.Brand href="/" className='fs-4'><FaShoppingCart/> Electro-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        { (user && user.isAdmin === true) &&
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/addProduct">Add Product</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          
        }
        <Row className='d-flex align-items-center'>
          {user ? 
            (
              <>
                <Col xs='auto'>
                  <LinkContainer to={'/cart'}>
                    <Nav.Link>
                      <FaShoppingBag className='fs-4'/> <Badge bg="danger">3</Badge>
                    </Nav.Link>
                  </LinkContainer>
                </Col>
                <Col xs="auto">
                  <span className="fs-5">Hi, {user.name}</span>
                </Col>
                <Col xs="auto">
                    <Button onClick={(handleLogOut)} variant="secondary" type="submit">
                      Logout
                    </Button> 
                </Col>
              </>
            ) : (
              <>
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
              </>
           )}
        </Row>
      </Container>
      
    </Navbar>
  )
}

export default Header
