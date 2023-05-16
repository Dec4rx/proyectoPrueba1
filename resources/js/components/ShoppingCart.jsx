import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useRef, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Trash } from "react-bootstrap-icons";

const ShoppingCart = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    const [cart, setCart] = useState([]);
    useEffect(() => {//Get Neighborhoods from Laravel
        axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_cart/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
                setCart(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:80/proyectoPrueba1/public/api/delete_product_cart/${e}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("delete", response.data)
                window.location.reload(true);
            }).catch(error => {
                console.log("NOOOOOOOOOO");
                console.log(error.response.data);

            })
    }

    const handleClear = async (e) => {
        await axios.delete(`http://localhost:80/proyectoPrueba1/public/api/clear_cart/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("CLEAR", response.data)
                window.location.reload(true);
            }).catch(error => {
                console.log("NOOOOOOOOOO");
                console.log(error.response.data);

            })
    }


    return (
        <Container className="m-5">

            <Card.Title className="text-center"><h5>Shopping Cart</h5></Card.Title>
            <hr />
            {cart.map(item =>
                <Card className="p-3 w-100 my-2">
                    <Button variant="danger" className="ms-auto" onClick={() => handleDelete(item.id)}><Trash /></Button>
                    <Row className="p-3" as={Link} to={'../result/' + item.product_id} style={{ textDecoration: 'none' }}>
                        <Col className="p-1 text-center border">
                            <Image
                                src={item.image}
                                style={{
                                    maxWidth: "250px",
                                    maxHeight: "250px",
                                }}
                            ></Image>
                        </Col>
                        <Col>
                            <Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>

                                        <Card.Title className="text-center"><h1>{item.product}</h1></Card.Title>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <p> <strong>Description:</strong> <br />
                                            {item.product_des}</p>
                                        <p><strong>Rate:</strong>  {item.rate}</p>
                                        <p><strong>Price: </strong>${item.product_price}</p>
                                        <p><strong>Category: </strong>{item.category}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}

            <Card>
                <Card.Title className="text-center mt-3 p-3">
                    <h2>Total amount</h2>
                    <p>${cart.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.product_price,
                        0
                    )}</p>
                    <hr />
                    <h2>Clear Shopping Cart</h2>
                    <div className='d-flex align-items-center'>
                        <Button variant="danger" type='submit' className='mx-auto w-25 d-flex align-items-center' onClick={handleClear}>
                            <Trash className='mx-auto w-50 d-flex align-items-center' />
                        </Button>
                    </div>
                </Card.Title>
            </Card>
        </Container>
    );
}

export default ShoppingCart;
