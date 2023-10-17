import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap';
import Header from '../components/header';
import Rating from '../components/Rating';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AboutProduct = () => {
  const [product, setProduct] = useState({})

  const productId = useParams().productId
  console.log(productId)

  useEffect(()=>{
    axios.get(`http://localhost:5000/products/${productId}`).then((res)=>{
      setProduct(res.data)
      console.log(product.title)
    }).catch(err => {
      console.log(err)
    })
  }, [productId])

  return (
    <>
      <Header />
      <Container className='mt-4'>
        <Row>
          <Col xs={5}>
            <Image src="https://i.pinimg.com/564x/8c/db/e1/8cdbe123010c380e20f264a8fdd57938.jpg" fluid rounded />
          </Col>
          <Col xs={6} className='m-4'>
            <Row>
              <h1 className='text-center' style={{fontSize: '4rem'}}>{product.title}</h1>
            </Row>
            <Row className='d-flex justify-content-center align-items-center'>
              <Col xs={6} className='text-center'>
                <Rating value={5} />
              </Col>
            </Row>
            <hr className='my-4' style={{ borderColor: 'gray' }}/>
            <Row >
              <p className='mt-3 text-center' style={{lineHeight: '1.9rem'}}>{product.description}</p>
            </Row>
            <hr className='my-4' style={{ borderColor: 'gray' }}/>
            <Row style={{marginTop: '40px'}}>
                <Col xs={4}><h2>Quantity : </h2></Col>
                <Col xs={6} className='d-flex justify-content-center'>
                    <Form.Control type="number" />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col xs={4}><h2>Price : </h2></Col>
                <Col xs={6} className='d-flex justify-content-center'>
                    <h2>$ {product.price}</h2>
                </Col>
            </Row>
            <Row style={{marginTop: '30px'}}>
                <Button variant="primary" size="lg" style={{ width: '200px' }}>
                    Add To Cart
                </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutProduct;
