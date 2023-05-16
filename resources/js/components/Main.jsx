import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from 'react'
import { Row, Col, Image, Form, Alert } from 'react-bootstrap';

import "react-alice-carousel/lib/alice-carousel.css";

import "/xampp/htdocs/ProyectoFinal/resources/css/app.css";
import { Button } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';


const carousel = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    let navigate = useNavigate();
    const navigateTo = (url) => {
        let path = url;
        navigate("/" + url);
    };

    const [productos, setProductos] = useState([]);
    useEffect(() => {//Get products from Laravel
        axios.get('http://localhost:80/proyectoPrueba1/public/api/show_products')
            .then(res => {
                console.log(res)
                setProductos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div class="main">
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="images/Carrousel/Discos.png"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="images/Carrousel/Funkos.png"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="images/Carrousel/Tazos.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
                <br />
                <CardGroup xs sm lg>
                    <Container className="d-flex flex-wrap">

                        <Row lg={3} sm={2} xs={1}>

                            {productos.map(product => (
                                <>
                                    <Col>
                                        <Card

                                            className="p-3 m-1 w-100"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                            }}

                                        >
                                            <Card.Img

                                                style={{ height: '300px' }}
                                                src={product.image}
                                                className="w-100"
                                                alt="Card image"
                                            />

                                            <Card.Body>
                                                <Card.Text><h4>{product.name}</h4><hr /></Card.Text>
                                                <Card.Text><strong>Description:</strong></Card.Text>
                                                <Card.Text>{product.description}</Card.Text>
                                                <Card.Text> <strong>Price:</strong>  ${product.price}</Card.Text>
                                                {product.categoryDad_name && <Card.Text> <strong>Primary Category:</strong>  {product.categoryDad_name}</Card.Text>}
                                                <Card.Text> <strong>Category:</strong>  {product.category_id}</Card.Text>
                                                <Button
                                                    variant="success"
                                                    className='mx-2'
                                                    as={Link}
                                                    to={`result/${product.id}`}
                                                >
                                                    See Product
                                                </Button>
                                            </Card.Body>


                                        </Card>
                                        <Card.Footer>

                                        </Card.Footer>

                                    </Col>
                                </>
                            ))}
                        </Row>
                    </Container>
                </CardGroup>
            </div>
        </>
    );
}

export default carousel;
