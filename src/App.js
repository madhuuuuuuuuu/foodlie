import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import RestaurantSpec from './components/RestaurantSpec'
import SearchDishes from './components/SearchDishes'
import SearchRestaurant from './components/SearchRestaurant'
import Cart from './components/Cart'


function App() {
 
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/restaurant/:restaurantId/:restaurantName' element={<RestaurantSpec/>}/>
     <Route path='/SearchDishes' element={<SearchDishes/>}/>
     <Route path='/SearchRestaurant' element={<SearchRestaurant/>}/>
     <Route path='/Cart' element={<Cart/>}/>
    </Routes>

    </BrowserRouter>
    
   
    </>
  )
}

export default App