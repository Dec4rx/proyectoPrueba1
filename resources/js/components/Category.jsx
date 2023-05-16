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


const Category = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const isAdmin = sessionStorage.getItem('isAdmin');

    const [brand, setBrand] = useState([]);
    useEffect(() => {//Get Wishlist from Laravel
        axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_categories`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:80/proyectoPrueba1/public/api/delete_category/${e}`,
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


    const [formOk, setFormOk] = useState(true);
    const [textError, setTextError] = useState('');

    const [name, setName] = useState('');
    const makeBrand = async () => {
        setFormOk(true);
        const formData = new FormData();
        formData.append("name", name)
        await axios.post('http://localhost:80/proyectoPrueba1/public/api/create_category',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(response => {

            console.log(response)
            setFormOk(true);

        }).catch(error => {
            console.log(error)
            setFormOk(false);
            setTextError('Marca ya registrada');
        });
    }


    return (
        <Container className="main">
            {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
            <Card.Title className="text-center w-100"><h1>Categories</h1></Card.Title>

            <Card className="d-flex align-items-center w-100">
                <br />
                <Form onSubmit={makeBrand} className="align-items-center">
                    <Form.Control as='textarea' rows={7} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <div className='d-flex align-items-center'>
                        <Button variant="success" type='submit' className='mx-auto w-50'>
                            Add
                        </Button>
                    </div>
                </Form>
                <br />
            </Card>


            <hr />
            {brand.map(item =>
                <>
                    <Card>
                        <div className="d-flex align-items-center">
                            <Card.Title className="flex-grow-1">{item.name}</Card.Title>
                            <Button variant="danger" onClick={() => handleDelete(item.id)}><Trash /></Button>
                        </div>
                    </Card>
                    <br />
                </>
            )}
        </Container>
    );
}

export default Category;
