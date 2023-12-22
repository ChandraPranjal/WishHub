import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route path='' element={<Home/>} />
      <Route path='signup' element={<SignUpPage />} />
      <Route path='login' element={<LoginPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className='h-screen'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
