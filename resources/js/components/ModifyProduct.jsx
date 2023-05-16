import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col, Image, Form, Alert } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useRef, useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import { BsPencilSquare, BsCart3 } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { AiFillStar, AiOutlineCreditCard } from 'react-icons/ai';

const ModifyProduct = () => {
  const user_id = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');

  let id = useParams();//para pasar product_id
  // let id = i.pro;
  console.log('id:')
  console.log(id.pro)

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
  

  const modifyProduct = async (e) => {
    console.log('formdata', formValue, category_id, brand_id, image )
    setFormOk(true);
    console.log(formValue, category_id,)
    const formData = new FormData();
    formData.append("name", formValue.name)//
    formData.append("price", formValue.price)//
    formData.append("description", formValue.description)//
    formData.append("rate", formValue.rate)//
    formData.append("quantity", formValue.quantity)//
    formData.append("deliverTime", formValue.deliverTime)//
    formData.append("category_id", category_id)//
    formData.append("brand_id", brand_id)//
    formData.append("product_id", id.pro)
    formData.append("image", image)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/update_product',
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
      console.log('NOOOOOOOOOOOOOOOOOO')
      console.log(error)
      setFormOk(false);
      setTextError('Verify the data');
      
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
        console.log('formdata', formValue, category_id, brand_id, image )
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





  const [product, setProduct] = useState([]);
  useEffect(() => {//Get Products from Laravel
    axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_specific_product/${id.pro}`)
      .then(res => {
        console.log(res)
        setProduct(res.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [])




  const [shopcart, setShopcart] = useState(false);//NO JALA
  useEffect(() => {//Get Shoppingcart from Laravel Test???
    axios.get(`http://localhost:80/proyectoPrueba1/public/api/inCart/${user_id}/${id.pro}`)
      .then(res => {
        console.log("restrue")
        console.log(res)
        if (res.data == 1) {
          setShopcart(true)
        }
      })
      .catch(err => {
        console.log(err)
        console.log("res")
      })
  }, [])

  function ed(id) {
    if (user_id == id && token)
      return true;
  }

  const t = true;

  // Inicializa un estado para almacenar las categorías seleccionadas
  const [selectedCategories, setSelectedCategories] = useState([]);


  return (
    <Container className='m-3 mx-auto'>
      <Card className='p-3 gap-3'>

        <br />
        <Card.Title className="text-center"><h1>{product.name}</h1></Card.Title>
        <hr />
        <Row className='m-3 mx-auto d-flex'>
          <Image
            className='rounded border p-2 w-50'
            src={"../" + product.image}
          />
          <Col className="me-3 p-3">
            <br />
            {product.categoryDad_name && <Card.Text> <strong>Primary Category:</strong>  {product.categoryDad_name}</Card.Text>}
            <Card.Text> <strong>Category:</strong>  {product.category_name}</Card.Text>
            <Card.Text><strong>Rate:</strong> {product.rate}/5</Card.Text>
            <Card.Text>
              <strong>Price:</strong> ${product.price}
            </Card.Text>
            <Card.Text>
              <strong>Arrival time:</strong>  {product.deliverTime} días
            </Card.Text>
            <Card.Text>
              <strong>Units available: </strong>{product.quantity}
            </Card.Text>
            <Card.Text>
              <strong>Brand:</strong>  {product.brand_name}
            </Card.Text>
            <Card.Text>
              <strong>Description: <br /></strong>  {product.description}
            </Card.Text>
            <br />
            
            <br />


          </Col>

        </Row>
        <Row>
          <Col>
          <Card.Title className="text-center"><h1>New data</h1></Card.Title>
          <hr />
            <Form onSubmit={modifyProduct} className="align-items-center">
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
                  <option value="">Select one please</option>
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
                 <option value="">Select one please</option>
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
                  Modify
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <br />

      </Card>
    </Container>
  );
}

export default ModifyProduct;