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

const EditComment = (props) => {

  //Other function
  const token = sessionStorage.getItem('token');
  const [text, setText] = useState('');
  const postData = async (e) => {
    if (e && e.preventDefault()) e.preventDefault(); e.preventDefault();
    const formData = new FormData();
    formData.append("id", props.value)
    formData.append("comment", text)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/update_comment',
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
        //console.log(response.data);
        console.log(response.data);
        window.location.reload(true);

      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <Form onSubmit={postData}>
      <br />
      <Form.Control
        onChange={(e) => setText(e.target.value)}
        as='textarea'
        rows={7}
      />
      <br />
      <div className='d-flex align-items-center'>
        <Button variant="success" type='submit' className='mx-auto w-25'>
          Submit
        </Button>
      </div>
    </Form>
  );

}

const SpecificProduct = () => {
  const user_id = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');

  let id = useParams();//para pasar product_id
  // let id = i.pro;
  console.log('id--->>>', id)

  //hacer post para pastbuys
  const [buy, setBuy] = useState(false);
  const PostBuy = async (e) => {
    const formData = new FormData();
    formData.append("user_id", user_id)
    formData.append("product_id", e)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/buy_product',
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
        console.log('responsefasfrgarejgñoierjhsth');
        console.log(response.data);
        setBuy(true)
      }
    }).catch(error => {
      console.log(error);
      console.log('no jaló :c');
    })
  }




  const [comment, setComment] = useState('');
  const PostComment = async () => {
    console.log(user_id, product.id, comment)
    const formData = new FormData();
    formData.append("user_id", user_id)
    formData.append("product_id", product.id)
    formData.append("comment", comment)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/store_comment',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
  }



  const handleDelete = async (e) => {
    await axios.delete(`http://localhost:80/proyectoPrueba1/public/api/delete_comment/${e}`,
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
        console.log(error.response.data);

      })
  }

  //Agregar al carrito 
  const [cart, setCart] = useState(false);
  const AddCart = async (e) => {
    const formData = new FormData();
    formData.append("product_id", e)
    formData.append("user_id", user_id)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/add_cart',
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
        setCart(true)
        console.log('response');
        //console.log(response.data);
        console.log(response.data);

      }
    }).catch(error => {
      console.log(error);
    })
  }

  //Agregar al Wishlist
  const [wish, setWish] = useState(false);
  const AddWishlist = async (e) => {
    const formData = new FormData();
    formData.append("product_id", e)
    formData.append("user_id", user_id)
    //formData.append("image", formValue.image)
    await axios.post('http://localhost:80/proyectoPrueba1/public/api/add_wishlist',
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
        setWish(true)
        console.log('response');
        //console.log(response.data);
        console.log(response.data);

      }
    }).catch(error => {
      console.log(error);
    })
  }


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



  const [comments, setCommets] = useState([]);
  useEffect(() => {//Get Commets from Laravel
    axios.get(`http://localhost:80/proyectoPrueba1/public/api/show_comment/${id.pro}`)
      .then(res => {
        console.log(res)
        setCommets(res.data)
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

  const [isShown, setIsShown] = useState(false);

  function handleClick() {
    // toggle shown state
    setIsShown(!isShown);
    // or simply set it to true
    // setIsShown(true);
  };


  const amounts = JSON.stringify(
    `${product.price}`
  )
  return (
    <Container className='m-3 mx-auto'>
      <Card className='p-3 gap-3'>

        <br />
        <Card.Title className="text-center"><h1>{product.name}</h1></Card.Title>
        <hr />
        {cart && (<Alert key='danger' variant='primary'>Product added to Shopping Cart</Alert>)}
        {wish && (<Alert key='danger' variant='warning'>Product added to Wishlist</Alert>)}
        {buy && (<Alert key='danger' variant='success'>Product bought</Alert>)}
        <Row className='m-3 mx-auto d-flex'>
          <Image
            className='rounded border p-2'
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

            {(token) ? <Button variant="outline-primary" className='d-flex align-items-center' onClick={() => AddCart(product.id)}> <BsCart3 /> Add to Cart </Button> : <></>}

            <br />
            <br />


            {(token) ? <Button variant="outline-warning" size="lg"  className='d-flex align-items-center' onClick={() => AddWishlist(product.id)}> <AiFillStar /> Wishlist</Button> : <></>}
            <br />
            <br />

            {(token) ? <Button variant='outline-success' size="lg" onClick={() => PostBuy(product.id)} ><AiOutlineCreditCard />  <h5>Buy for {product.price}</h5></Button> : <></>}
            <br />
            <br />
          </Col>

        </Row>
        <hr />
        <Row>
          <Col>
            <Card.Text className="mt-2"><h4>Description:</h4></Card.Text>
            <Card.Text>{product.description}</Card.Text>
          </Col>
        </Row>


      </Card>
      <br />
      <Card>
        <Card.Text className="mt-2 text-center"><h1>Comments</h1></Card.Text>
      </Card>
      <br />
      {comments.map(com =>

        <Card className=" w-100 mb-2">
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <p class='mb-1'>
                    <strong>{com.user_name} {com.user_lastname}</strong>
                    <p class='text-muted'>{com.date}</p>
                  </p>
                </Col>
              </Row>
              <Form.Control
                id={com.id}
                value={com.comment}
                readOnly
                as='textarea'
                rows={7}
              />
            </Card.Text>
            {ed(com.user_id) ? <Button variant="danger" onClick={() => handleDelete(com.id)} > <FiDelete /> </Button> : <></>}
            {ed(com.user_id) ? <>  {<Button variant="primary" onClick={handleClick} > <BsPencilSquare /> </Button>} {isShown && <EditComment value={com.id} />} </> : <></>}

          </Card.Body>

        </Card>
      )}
      {(token) ? <Card>
        <br />
        <Card.Title className="text-center"><h5>Make your comment!</h5></Card.Title>
        <Form onSubmit={PostComment}>
          <Form.Control
            as='textarea'
            rows={7}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <div className='d-flex align-items-center'>
            <Button variant="success" type='submit' className='mx-auto w-50'>
              Make comment
            </Button>
          </div>
          <br />
        </Form>
      </Card> : <></>}

    </Container>
  );
}

export default SpecificProduct;