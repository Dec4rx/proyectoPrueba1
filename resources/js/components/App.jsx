import React from 'react';
import Example from './Example';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom"
import NavBar from './NavBar';
import Carousel from "./Main";
import SearchResult from './SearchResult';
import SpecificProduct from './SpecificProduct';
import Register from './Register';
import Login from './Login';
import AddAddress from './AddAddress';
import Profile from './Profile';
import Bought from './Bought';
import ShoppingCart from './ShoppingCart';
import WhisList from './WishList';
import Brand from './Brand';
import Category from './Category';
import Product from './Product';
import ModifyProduct from './ModifyProduct';

export default function App() {
    return (
        <div className="App" class="div-main">
            <BrowserRouter>
                <Routes>
                    <Route path="/proyectoPrueba1/public/" element={<NavBar />}>
                        <Route index element={<Carousel />} />
                        <Route path="result" element={<SearchResult />}/>
                        <Route path="result/:pro" element={<SpecificProduct/>}/>
                        <Route path="register" element={<Register />}/>
                        <Route path="addAddress" element={<AddAddress />}/>
                        <Route path="login" element={<Login />}/>
                        <Route path="profile" element={<Profile />}/>
                        <Route path="boughts" element={<Bought />}/>
                        <Route path="shoppingcart" element={<ShoppingCart />}/>
                        <Route path="wishlist" element={<WhisList />}/>

                        <Route path="brand" element={<Brand />}/>
                        <Route path="category" element={<Category />}/>
                        <Route path="product" element={<Product />}/>
                        <Route path="modify/:pro" element={<ModifyProduct/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}