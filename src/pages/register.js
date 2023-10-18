import axios from 'axios';
import React, {useState} from 'react'
import {Button, Container, Form} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import {FaLessThan } from 'react-icons/fa'

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  async function handleOnRegister(e){
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/register', {name, email, password}).then((res)=>{
        console.log('registring data')
      })
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  
  }

  return (
    <Container style={{width: '600px', marginTop: '100px'}}>
      <Form className='mt-4'>
        <h1>Register</h1>
        <Form.Group className="mb-3" controlId="formBasicusername">
            <Form.Label>Username</Form.Label>
            <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>

        <Button onClick={handleOnRegister} variant="primary" type="submit">
            Register
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

export default Register
