import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import CardGroup from "react-bootstrap/CardGroup";
import { Alert } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Star } from "react-bootstrap-icons";

const SearchResult = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    let { productoS } = useParams();
    let condicion;

    if (productoS != null) {

        condicion = productoS;
    } else {

        condicion = "";
    }


    const [helper, setHelper] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    const [index, setIndex] = useState("");
    const [query, setQuery] = useState("");
    const [disable, setDisable] = useState(true);
    const [quitados, setQuitados] = useState([]);

    //Get products
    const [productos, setProductos] = useState([]);
    useEffect(() => {//Get products from Laravel
        axios.get('http://localhost:80/proyectoPrueba1/public/api/show_products')
            .then(res => {
                console.log(res)
                setProductos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const Duplicates = productos.map((tags) => tags.category_id);
    const [pivote, setPivote] = useState([...new Set(Duplicates)]);
    const [noDuplicates, setNoDuplicates] = useState(pivote);

    const [product, setProduct] = useState('');


    //Add wishlist
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



    // const removeItem = (index) => {
    //     setQuitados([...quitados, index]);
    //     console.log("seleccionado: ", selectedTag);
    //     setProductos(productos.filter((o, i) => index !== i));
    // };

    return (
        <>
            <br />
            <Container className="main">
                <h4 className="text-center mt-2">Filters</h4>
                <Form.Group className="w-100">
                    <Form.Label>Category:</Form.Label>
                    <Form.Select
                        type="select"
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        <option value="">Chose one</option>
                        {productos.filter((tags, index, self) => self.findIndex(t => t.category_id === tags.category_id) === index).map((tags) => (
                            <option key={tags.category_id} value={tags.category_id}>{tags.category_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Select
                        type="select"
                        onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                        <option value="">Chose one</option>
                        {productos.reduce((uniqueBrands, product) => {
                            if (!uniqueBrands.some(brand => brand.brand_id === product.brand_id)) {
                                uniqueBrands.push({ brand_id: product.brand_id, brand_name: product.brand_name });
                            }
                            return uniqueBrands;
                        }, []).map((brand) => (
                            <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                        ))}

                    </Form.Select>
                </Form.Group>
                <Form.Group className="d-block gap-1">
                    <Form.Label>Price:</Form.Label>
                    <br />
                    <Form.Range
                        className="w-100"
                        controlId="maxCost"
                        min={10}
                        max={1000}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <p>Max cost: ${query}</p>
                </Form.Group>
            </Container>
            <Container className="d-flex p-3">


                <Container>
                    <Container className="d-flex flex-wrap">
                        <div className="w-100 justify-content-center">
                            {wish && (<Alert key='danger' variant='warning'>Product added to Wishlist</Alert>)}
                        </div>

                        <Row lg={3} sm={2} xs={1}>

                            {productos.filter(
                                (productf) =>
                                    productf.category_id.toString().includes(selectedTag) &&
                                    productf.name.includes(condicion) &&
                                    (productf.price.toString().includes(query) || productf.price < query) &&
                                    productf.brand_id.toString().includes(selectedBrand)
                            ).map(product => (
                                <>
                                    <Col>

                                        <Card

                                            className="p-3 m-1 w-100"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                            }}

                                        >


                                            <Card className='m-3 mx-auto d-flex'>
                                                <Card.Img

                                                    style={{ height: '300px' }}
                                                    src={product.image}
                                                    className="w-100"
                                                    alt="Card image"
                                                />
                                            </Card>


                                            <Card.Body>
                                                <Card.Text><h4>{product.name}</h4><hr /></Card.Text>
                                                <Card.Text><strong>Description:</strong></Card.Text>
                                                <Card.Text>{product.description}</Card.Text>
                                                <Card.Text> <strong>Price:</strong>  ${product.price}</Card.Text>
                                                {product.categoryDad_name && <Card.Text> <strong>Primary Category:</strong>  {product.categoryDad_name}</Card.Text>}
                                                <Card.Text> <strong>Category:</strong>  {product.category_name}</Card.Text>
                                                <Card.Text> <strong>Brand:</strong>  {product.brand_name}</Card.Text>

                                                <Button
                                                    variant="success"
                                                    className='mx-2'
                                                    as={Link}
                                                    to={`../result/${product.id}`}
                                                >
                                                    See Product
                                                </Button>
                                                {(token) ? <Button size="lg" variant="outline-warning" onClick={() => AddWishlist(product.id)}><Star /></Button> : <></>}
                                            </Card.Body>


                                        </Card>
                                        <Card.Footer>

                                        </Card.Footer>

                                    </Col>

                                </>
                            ))}
                        </Row>
                    </Container>
                </Container>
            </Container>
        </>
    );
}

export default SearchResult;
