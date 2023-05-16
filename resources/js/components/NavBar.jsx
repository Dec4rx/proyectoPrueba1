import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import 'bootstrap/dist/css/bootstrap.css';

import {
    PersonCircle,
    Search,
    Bell,
    Cart,
    Shop,
    Facebook,
    Whatsapp,
    Twitter,
    Envelope,
    Star,
    Bag,
} from "react-bootstrap-icons";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";



const Footer = () => (

    <footer className="page-footer font-small blue pt-4" class="footer">
        <div className="container-fluid text-center text-md-left">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-6 mt-md-0 mt-3">
                    <h5 className="text-uppercase">Colectico</h5>
                    <p>Colectico is a web page dedicated to offering all possible collectibles</p>
                </div>

                <hr className="clearfix w-100 d-md-none pb-0" />


                <div className="col-md-3 mb-md-0 mb-3">
                    <h5 className="text-uppercase">Contact us</h5>
                    <ul className="list-unstyled">
                        <li class="d-flex align-items-center justify-content-center">
                            <a
                                class="me-2"
                                href="https://www.facebook.com/"
                            >
                                Facebook
                            </a>
                            <Facebook />
                        </li>
                        <li class="d-flex align-items-center justify-content-center">
                            <a class="me-2" href="https://wa.me/4491423423">
                                Whatsapp
                            </a>
                            <Whatsapp />
                        </li>
                        <li class="d-flex align-items-center justify-content-center">
                            <a class="me-2" href="https://twitter.com/">
                                Twitter
                            </a>
                            <Twitter />
                        </li>
                        <li class="d-flex align-items-center justify-content-center">
                            <a
                                class="me-2"
                                href="mailto:19151665@aguascalientes.tecnm.mx?Subject=Correo%20desde%20la%20pagina"
                            >
                                Email
                            </a>
                            <Envelope />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
);

const NavBar = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const isAdmin = sessionStorage.getItem('isAdmin');
    const logOut = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAdmin');
        window.location.reload(true);
    }

    const [showBasic, setShowBasic] = useState(false);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Container className="p-2 mx-auto">
                    <Navbar.Brand as={Link} to="/proyectoPrueba1/public/">
                        Colectico
                    </Navbar.Brand>
                    {(!isAdmin) ?
                        <Nav.Link className="ml-auto"> <Button
                            className="mx-auto bg-black border-light" size="lg"
                            as={Link}
                            to='result'
                        >Product catalog</Button>
                        </Nav.Link> :
                        <></>}

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-3 gap-3 ms-auto">
                            <Nav.Link className="d-flex gap-1">
                                <NavDropdown

                                    className="justify-content-center"
                                    title="User"
                                    id="basic-nav-dropdown"
                                >

                                    {(token && !isAdmin) ? <NavDropdown.Item as={Link} to="profile">
                                        Profile
                                    </NavDropdown.Item> : <></>}

                                    {token != null ? <> </> : <NavDropdown.Item as={Link} to="login">
                                        Login
                                    </NavDropdown.Item>}
                                    {(token) ? <> </> : <NavDropdown.Item as={Link} to="register">
                                        Create an account
                                    </NavDropdown.Item>}
                                    {(token && !isAdmin) ?
                                        <NavDropdown.Item as={Link} to="wishList">
                                            Wish list
                                        </NavDropdown.Item>
                                        : <></>}
                                    {(token && !isAdmin) ?
                                        <NavDropdown.Item as={Link} to="shoppingcart">
                                            Shopping Cart
                                        </NavDropdown.Item>
                                        : <></>}

                                    {(token && isAdmin !== '1') ? <NavDropdown.Item as={Link} to="boughts">
                                        Orders
                                    </NavDropdown.Item>
                                        : <></>}

                                    {(token && isAdmin === '1') ? <NavDropdown.Item as={Link} to="brand">
                                        Brands Management
                                    </NavDropdown.Item>
                                        : <></>}

                                    {(token && isAdmin === '1') ? <NavDropdown.Item as={Link} to="category">
                                        Categories Management
                                    </NavDropdown.Item>
                                        : <></>}

                                    {(token && isAdmin === '1') ? <NavDropdown.Item as={Link} to="product">
                                        Products Management
                                    </NavDropdown.Item>
                                        : <></>}

                                    {(token) ? <><NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logOut} as={Link}>Logout</NavDropdown.Item></> : <></>}

                                </NavDropdown>
                            </Nav.Link>
                        </Nav>
                        <Nav xs sm lg className="d-flex flex-wrap">
                            <Nav.Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section class="section-main">
                <Outlet></Outlet>
            </section>
            <br />
            <Footer />
        </>
    );
}

export default NavBar;
