import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path=""
        element={
          <Protected>
            <Home />
          </Protected>
        }
      ></Route>
      <Route path="login" element={<LoginPage />}></Route>
      <Route path="signup" element={<SignUpPage />}></Route>
      <Route
        path="cart"
        element={
          <Protected>
            <CartPage />
          </Protected>
        }
      ></Route>
      <Route
        path="checkout"
        element={
          <Protected>
            <CheckoutPage />
          </Protected>
        }
      ></Route>
      <Route
        path="productdetails/:id"
        element={
          <Protected>
            <ProductDetailPage />
          </Protected>
        }
      ></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
