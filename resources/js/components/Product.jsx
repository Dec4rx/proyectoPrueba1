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

const Bought = () => {
  const user_id = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');

  const [products, setProduct] = useState([]);
  useEffect(() => {//Get Neighborhoods from Laravel
    axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_products`,
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


  const [formValue, setFormValue] = useState({
    name: '',
    price: 0.0,
    quantity: 0,
    rate: 0.0,
    deliverTime: 0,
    description: '',
  })

  const [category_id, setCategory_id] = useState(0)
  const [brand_id, setBrand_id] = useState(0)

  const [image, setImage] = useState(null);
  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  }

  const [formOk, setFormOk] = useState(true);
  const [textError, setTextError] = useState('');

  const onChange = (e) => {
    e.persist();
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
    /*concatena al formValue,    email         lo que escriba el usuario como email */
  }

  const makeProduct = async (e) => {
    setFormOk(true);
    const formData = new FormData();
    formData.append("name", formValue.name)//
    formData.append("price", formValue.price)//
    formData.append("description", formValue.description)//
    formData.append("rate", formValue.rate)//
    formData.append("quantity", formValue.quantity)//
    formData.append("deliverTime", formValue.deliverTime)//
    formData.append("category_id", category_id)//
    formData.append("brand_id", brand_id)//
    formData.append("image", image)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/create_product',
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
      console.log('SIIIIIIIIIIIIIIIIIIIIIIIII')

    }).catch(error => {
      console.log(error)
      setFormOk(false);
      setTextError('Verify the data');
      console.log('NOOOOOOOOOOOOOOOOOO')
    });
  }

  //Para obtener categorias
  const [category, setCategory] = useState([]);
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
        setCategory(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //Para obtener brands
  const [brand, setBrand] = useState([]);
  useEffect(() => {//Get Wishlist from Laravel
    axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_brand`,
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

  //Eliminar Producto
  const handleDelete = async (e) => {
    await axios.delete(`http://localhost:80/proyectoPrueba1/public/api/delete_product/${e}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("delete", response.data)
        console.log("SIIIIIIIIIIIIIIII")
        window.location.reload(true);
      }).catch(error => {
        console.log("NOOOOOOOOOO");
        console.log(error.response.data);

      })
  }

  return (
    <Container className='p-3 pt-5'>
      <Card.Title className="text-center"><h1>Products</h1></Card.Title>
      <hr />

      <Card className="d-flex align-items-center w-100">
        <br />
        <Form onSubmit={makeProduct} className="align-items-center">
          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>New Image:</Form.Label>
            <Form.Control
              accept="image/*"
              type="file"
              onChange={onChangeFile}
            />
            <br />
            <Form.Label>Category:</Form.Label>
            <Form.Select
              name="category"
              onChange={(e) => setCategory_id(e.target.value)}
            >
              {
                category.map(cat =>
                  <option value={cat.id}>{cat.name}</option>

                )
              }
            </Form.Select>
            <br />
            <Form.Label>Brand:</Form.Label>
            <Form.Select
              name="category"
              onChange={(e) => setBrand_id(e.target.value)}
            >
              {
                brand.map(cat =>
                  <option value={cat.id}>{cat.name}</option>

                )
              }
            </Form.Select>
            <br />
            <Form.Label>Name:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="name"
              type="text"
              maxLength={"100"}
              placeholder="Type the name"
              required
              value={formValue.name}
              onChange={onChange}
            />
            <br />
            <Form.Label>Rate:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="rate"
              type="text"
              pattern="^\d{0,5}(\.\d{0,2})?$"
              placeholder="Type the rate"
              required
              value={formValue.rate}
              onChange={onChange}
            />
            <br />
            <Form.Label>Deliver time:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="deliverTime"
              type="text"
              pattern="^[1-9]\d*$"
              placeholder="Type the deliver time"
              required
              value={formValue.deliverTime}
              onChange={onChange}
            />
            <br />
            <Form.Label>Price:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="price"
              type="text"
              pattern="^[1-9]\d*(\.\d+)?$"
              placeholder="Type the price"
              required
              value={formValue.price}
              onChange={onChange}
            />
            <br />
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="quantity"
              type="text"
              pattern="^[1-9]\d*$"
              placeholder="Type the price"
              required
              value={formValue.quantity}
              onChange={onChange}
            />
            <br />
            <Form.Label>Description:</Form.Label>
            <Form.Control as='textarea'
              name="description"
              rows={7} value={formValue.description}
              onChange={onChange} />
            <br />
          </Form.Group>
          <div className='d-flex align-items-center'>
            <Button variant="success" type='submit' className='mx-auto w-50'>
              Add
            </Button>
          </div>
        </Form>
        <br />
      </Card>


      <hr />


      {products.map(item =>
        <Card className="p-3 w-100 my-2">
          <Button variant="danger" className="ms-auto" onClick={() => handleDelete(item.id)}><Trash /></Button>
          <Row className="p-3" as={Link} to={'../modify/' + item.id} style={{ textDecoration: 'none' }}>
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

                    <Card.Title className="text-center"><h1>{item.name}</h1></Card.Title>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p> <strong>Description:</strong> <br />
                      {item.description}</p>
                    <p><strong>Rate:</strong>  {item.rate}</p>
                    <p><strong>Price: </strong>${item.price}</p>
                    <p><strong>Category: </strong>{item.category_name}</p>
                    <p><strong>Brand: </strong>{item.brand_name}</p>
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