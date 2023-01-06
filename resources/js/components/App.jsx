import React from 'react';
import Example from './Example';
import { BrowserRouter,  Route, Routes, Router} from "react-router-dom"

export default function App() {
    return (
        <div className="App" class="div-main"> 
            <BrowserRouter> 
                <Routes>
                    <Route path="/proyectoPrueba1/public/" element={<Example />}>
                       
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );       
}