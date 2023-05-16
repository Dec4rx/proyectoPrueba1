import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Row, Col, Image, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { BsPencilSquare, BsFillTrashFill, BsGear } from 'react-icons/bs';
import { CgAdd } from 'react-icons/cg';
import { AiFillFileImage, AiOutlineCreditCard } from 'react-icons/ai';
import "/xampp/htdocs/ProyectoFinal/resources/css/app.css";

const Profile = () => {
    const user_id = sessionStorage.getItem('user')//current user_id
    const token = sessionStorage.getItem('token')

    const [isShown, setIsShown] = useState(false);
    function handleClick() {
        // toggle shown state
        setIsShown(!isShown);
        // or simply set it to true
        // setIsShown(true);
    };

    const [isShown1, setIsShown1] = useState(false);
    function handleClick1() {
        // toggle shown state
        setIsShown1(!isShown1);
        // or simply set it to true
        // setIsShown(true);
    };

    const [isNum, setIsNum] = useState(false);
    function val() {

    }


    //Add image user
    const [image, setImage] = useState(null);
    const onChangeFile = (e) => {
        setImage(e.target.files[0]);
    }
    const postImage = async () => {
        const formData = new FormData();
        formData.append("user_id", user_id)
        formData.append("image", image)
        await axios.post('http://localhost:80/proyectoPrueba1/public/api/add_image',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(response => {
            if (response.status == 200) {
                console.log('response');
                console.log(response.data);
                window.location.reload(true);

            }
        }).catch(error => {
            console.log('nooo')
            console.log(error);
        })
    }





    const [user, setUser] = useState([]);
    useEffect(() => {//Get data User from Laravel
        axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_user/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [address, setAddress] = useState([])

    useEffect(() => {//Get Address User from Laravel
        axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_address/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                setAddress(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //Delete Address  
    const DeleteAddress = async (e) => {//CHECAR
        console.log(e)
        await axios.delete(`http://localhost:80/proyectoPrueba1/public/api/delete_address/${e}`
            , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log("delete Address", response.data)
                window.location.reload(true);
            }).catch(error => {
                console.log(error.response.data);

            })
    }


    return (
        <div class="div_card-profile">
            <Container>
                <Card className="w-75 p-3">
                    <Card.Title className="text-center"><h5>Welcome {user.name} {user.last_name}</h5></Card.Title>
                    <hr />
                    <Row>
                        <Col>
                            <Card.Img
                                src={user.image}
                                className="w-75 mx-auto d-block rounded border p-2"
                            />
                            <div className="d-grid gap-2">
                                <Form.Group controlId="formFile" className="">
                                    <Form.Label>New Image:</Form.Label>
                                    <Form.Control
                                        accept="image/*"
                                        type="file"
                                        onChange={onChangeFile}
                                    />
                                </Form.Group>
                                <div className='d-flex w-100'>
                                    <Button variant="success" size="ls" className='mx-auto w-50' onClick={postImage}>
                                        Submit new image<AiFillFileImage />
                                    </Button>
                                </div>
                            </div>

                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ListGroup className="list-group-flush">

                                <ListGroup.Item>
                                    <strong>Information</strong>
                                </ListGroup.Item>
                                <p><strong>Birthday:</strong> {user.birth}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Gender:</strong> {user.gender}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card.Body>


                                <Card.Title className="text-center">Address</Card.Title>
                                <hr />
                                {address.map(ad => (
                                    <tr>
                                        <td><strong>{ad.id}.- </strong>{ad.name}</td>
                                        <td><Button variant="danger" size="sm" className='mx-2' onClick={() => DeleteAddress(ad.id)} > <BsFillTrashFill /> </Button></td>
                                    </tr>

                                ))}

                                <div className='d-flex w-100'>
                                    <Button variant="success" size="ls" className='mx-auto w-50' as={Link} to="/proyectoPrueba1/public/addAddress">
                                        <CgAdd />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div >
    );
}

export default Profile;
