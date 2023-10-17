import axios from 'axios';
import React, {useState} from 'react'
import {Button, Container, Form} from 'react-bootstrap';

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
    <Container className='mt-4' style={{width: '600px'}}>
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
    </Container>
  )
}

export default Register
