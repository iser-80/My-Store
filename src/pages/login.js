import axios from 'axios';
import React, { useState } from 'react'
import {Button, Container, Form} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import {FaLessThan } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleOnLogin(e){
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/login', {email, password}).then((res) => {
        const token = res.data.token
        if(token){
          console.log('login success')
          localStorage.setItem('token', token);
          setEmail('')
          setPassword('')
          navigate('/')
        }else{
          console.log('login denied')
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Container style={{width: '600px', marginTop: '100px'}}>
      <Form className='mt-4'>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>

        <Button onClick={handleOnLogin} variant="primary" type="submit">
            Login
        </Button>
      </Form>
      <LinkContainer style={{color: 'gray', marginTop: '40px'}} to={'/'}>
        <Nav.Link>
          <FaLessThan/> Go Home
        </Nav.Link>
      </LinkContainer>
    </Container>
  )
}

export default Login
