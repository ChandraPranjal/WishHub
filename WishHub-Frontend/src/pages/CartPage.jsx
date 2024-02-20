import React from "react";
import Cart from "../features/cart/Cart";
import { useSelector } from "react-redux";
import Navbar from "../features/navbar/Navbar";
function CartPage({ currentAddress, paymentMethod }) {
  const user = useSelector((store) => store.auth.userToken);
  const orderData = { user, currentAddress, paymentMethod };
  return (
    <>
      <Navbar>
        <Cart orderData={orderData} />
      </Navbar>
    </>
  );
}

export default CartPage;
