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
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import OrderSuccessPage from "./pages/OrderSuccessPage"
import UserOrderPage from "./pages/UserOrderPage";

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
      <Route
        path="order_success/:id"
        element={
          <Protected>
            <OrderSuccessPage />
          </Protected>
        }
      ></Route>
      <Route
        path="/userOrders"
        element={
          <Protected>
            < UserOrderPage/>
          </Protected>
        }
      ></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
