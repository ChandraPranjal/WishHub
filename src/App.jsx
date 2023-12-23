import React from 'react'
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductDetailPage from './pages/ProductDetailPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/'>
      <Route path = '' element = {<Home/>}></Route>
      <Route path = 'login' element = {<LoginPage/>}></Route>
      <Route path = 'signup' element = {<SignUpPage/>}></Route>
      <Route path = 'cart' element = {<CartPage/>}></Route>
      <Route path = 'checkout' element = {<CheckoutPage/>}></Route>
      <Route path ='productdetails' element = {<ProductDetailPage/>}></Route>


    </Route>

  )

)

function App() {
  return (
    <RouterProvider router = {router}/>
  )
}

export default App
