import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header';
import Product from '../components/product';
import { Row, Container, Col } from 'react-bootstrap';
import axios from 'axios';


const Home = () => {
    const [products, setProduts] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/data').then((res)=>{
        setProduts(res.data)
    })
    }, [])

  return (
    <>
        <Header/>
        <Container className='mt-4'>
            <Row>
                {products.map((product)=>(
                    <Col lg={3}>
                        <Product id={product._id} title={product.title} description={product.description}/>
                    </Col>
                ))}
            </Row>
        </Container>
        
    </>
  )
}

export default Home
