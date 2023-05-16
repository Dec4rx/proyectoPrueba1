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


const Bought = () => {
  const user_id = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');

  const [products, setProduct] = useState([]);
  useEffect(() => {//Get Neighborhoods from Laravel
    axios.get(`http://localhost:80/proyectoPrueba1/public/api/past_shopping/${user_id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {

        setProduct(res.data)
        console.log(res.data)
        console.log('bien?')
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [brand, setBrand] = useState([]);
  useEffect(() => {//Get Neighborhoods from Laravel
    axios.get(`http://localhost:80/proyectoPrueba1/public/api/`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data)
        setBrand(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <Container className='p-3 pt-5'>
      <Card.Title className="text-center"><h1>Orders</h1></Card.Title>
      <hr />


      {products.map(item =>
        <Card className="p-3 w-100 my-2">
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
                      {item.description}</p>
                    <p><strong>Rate:</strong>  {item.rate}</p>
                    <p><strong>Price: </strong>${item.price}</p>
                    <p><strong>Category: </strong>{item.category}</p>
                    <p><strong>Brand: </strong>{item.brand}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}


    </Container>
  );
}

export default Bought;