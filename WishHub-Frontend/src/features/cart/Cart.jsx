//Added quantity state mySelf from tailwind template
//Made a component CardItem also

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CardItem from "./CartItem";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAsync } from "../order/orderSlice";

export default function Cart({ orderData }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { pathname } = location;

  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.cartItems);
  const orderStatus = useSelector((store) => store.order.orders);
  const initialValue = 0;
  let totalCost = 0;
  products.forEach((item) => {
    totalCost += item.product.price * item.quantity;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (orderStatus) navigate(`/order_success/${orderStatus._id}`);
  }, [orderStatus]);

  return (
    <>
      {!products.length && <Navigate to="/"></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setOpen(false)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => {
                  return (
                    <li key={product.id} className="flex py-6">
                      <CardItem product={product} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalCost}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <div
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
              onClick={() => {
                if (pathname === "/checkout") {
                  if (!orderData.currentAddress) {
                    alert("Select Address");
                    return;
                  }

                  const order = {
                    items: [],
                    address: "",
                    totalAmount: "",
                    user: "",
                    status: "pending",
                    paymentMethod: "",
                  };
                  products.map((product) => {
                    order.items.push({
                      product: product.product.id,
                      quantity: product.quantity,
                    });
                  });
                  order.address = orderData.currentAddress._id;
                  order.totalAmount = totalCost;
                  order.user = orderData.user;
                  order.status = "pending";
                  order.paymentMethod = orderData.paymentMethod;

                  // dispatch(createOrderAsync({ products, orderData }));
                  dispatch(createOrderAsync(order));
                } else navigate("/checkout");
              }}
            >
              {pathname === "/checkout" ? "Pay and Order" : "Checkout"}
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                <Link to="/">Continue Shopping</Link>
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
