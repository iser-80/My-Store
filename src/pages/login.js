import axios from 'axios';
import React, { useState } from 'react'
import {Button, Container, Form} from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleOnLogin(e){
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/login', {email, password}).then((res) => {
        console.log(res.data)
        if(res.data === 'found'){
          console.log('login success')
        }else{
          console.log('login denied')
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Container className='mt-4' style={{width: '600px'}}>
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
    </Container>
  )
}

export default Login
