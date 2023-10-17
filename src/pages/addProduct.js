import React, { useState } from 'react'
import Header from '../components/header'
import { Form, Container, Button } from 'react-bootstrap'
import axios from 'axios'

const AddProduct = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(null)
  const [quantity, setQuantity] = useState('')


  async function handleOnSubmit(e) {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/addProduct', { title, description, price, quantity })
      console.log('product sent')

      setTitle('')
      setDescription('')
      setPrice('')
      setQuantity('')

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <Header />
      <Container className='mt-4' style={{ width: '500px' }}>
        <h1>Add New Product</h1>
        <Form className='mt-4'>
          {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>choose the image of your product</Form.Label>
                <Form.Control name='image' onChange={handleImageChange} type="file" />
            </Form.Group> */}
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="Number" />
          </Form.Group>
          <Form.Group controlId="formQuanitity" className="mb-3">
            <Form.Label>Quantity in Stock</Form.Label>
            <Form.Control value={quantity} onChange={(e) => setQuantity(e.target.value)} type="Number" />
          </Form.Group>
          <Button onClick={handleOnSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default AddProduct
