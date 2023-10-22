import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header';
import Product from '../components/product';
import { Row, Container, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const Home = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/data', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            if (error.response.status === 401 && error.response.data.message === 'TokenExpiredError') {
                // Handle token expiration: log out the user, clear authentication data, and redirect to login page
                localStorage.removeItem('token');
                // Redirect to the login page
                window.location.href = '/login';
            } else {
                console.log('Error fetching product data:', error);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    return (
        <>
            <Header />
            <Container className='mt-4'>
                <Row>
                    {products.map((product) => (
                        <Col lg={3} key={product._id}>
                            <Product
                                id={product._id}
                                title={product.title}
                                description={product.description}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Home;
