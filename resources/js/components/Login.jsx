import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useRef, useState, useEffect } from "react";
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
const Login = () => {

  const onChangeFormData = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // State de los errores del formulario
  const [textError, setTextError] = useState('');
  const [formOk, setFormOk] = useState(true);

  // Funcion de react router dom
  const navigate = useNavigate();

  // States del formulario
  const [formData, setformData] = useState({
    email: '',
    password: ''
  });

  const login = (e) => {
    e.preventDefault();

    // Validación del formulario
    setFormOk(true);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    axios.post("http://localhost:80/proyectoPrueba1/public/api/login",
      formData,
      { headers })
      .then(response => {

        console.log(response)
        sessionStorage.setItem('token', response.data.token);

        sessionStorage.setItem('user', response.data.user.id);

        //sessionStorage.setItem('isAdmin', response.data.user.isAdmin);
        if (response.data.user.isAdmin === 1) {
          sessionStorage.setItem('isAdmin', response.data.user.isAdmin);
          const isAdmin = sessionStorage.getItem('isAdmin');
          if (isAdmin === '1') {

            navigate("/proyectoPrueba1/public/brand");
          }
        }
        else {
          navigate("/proyectoPrueba1/public/");
        }
        window.location.reload();

      }).catch(error => {
        console.log(error)
        setFormOk(false);
        setTextError('Contraseña o correo incorrecto');
      });
  }
  return (
    <>
      <Container className="container d-flex justify-content-center">
        <Card className="p-3 mt-5 login w-75">
          <br />
          <Card.Title className="text-center"><h1>Login</h1></Card.Title>
          <hr />
          {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                title='Wrong email, try again'
                type="email"
                placeholder="Type your email"
                value={formData.email}
                name="email"
                onChange={onChangeFormData}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                title='Wrong password, check your credentials'
                type="password"
                required
                placeholder="Type your password"
                value={formData.password}
                name="password"
                onChange={onChangeFormData}
                autoComplete="on"
              />
            </Form.Group>

            <div className='d-flex align-items-center'>
              <Button variant="success" type='submit' className='mx-auto w-50'>
                Login
              </Button>
            </div>
            <div className="text-center">
              <Form.Label className="mt-2">You do not have an account? <Link to="/proyectoPrueba1/public/register"><span className='text-primary' role="button">Register</span></Link></Form.Label>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default Login;
