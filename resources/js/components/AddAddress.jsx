import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useRef, useState, useEffect, useContext } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

// Context


function AddAddress() {
  //Navigate
  const navigate = useNavigate();

  // Auth Context USER

  const user_id = sessionStorage.getItem('user')//current user_id
  const token = sessionStorage.getItem('token')


  const [address, setAddress] = useState('')

  const onChange = (e) => {
    e.persist();
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
    /*concatena al formValue,    email         lo que escriba el usuario como email */
  }


  //Store Address
  const postAddress = async (e) => {
    const formData = new FormData();
    formData.append("name", address)
    formData.append("user_id", user_id)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/add_address',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json', 'Authorization': `Bearer ${token}`
        }
      }
    ).then(navigate('../'))
  }

  return (
    <>
      <div class="login-div">
        <Container className="w-75">
          <Card className="p-3">
            <br />
            <Card.Title className="text-center"><h1>Add an address</h1></Card.Title>
            <hr />
            <Form onSubmit={postAddress}>
              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  title='Wrong input'
                  name="name"
                  type="text"
                  maxLength={"100"}
                  placeholder="Type your address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <div className='d-flex align-items-center'>
                <Button variant="success" type='submit' className='mx-auto w-50'>
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default AddAddress;