import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggerInUserOrdersAsync } from "../userSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.userToken);
  //   console.log("User in UserOrder is ", user);
  // const orders = useSelector((store) => store.user.userOrders);
  const [orders, setOrders] = useState();
  useEffect(() => {
    // dispatch(fetchLoggerInUserOrdersAsync(userId));
    const fetchOrders = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/orders`,
        { credentials: "include" }
      );
      const data = await response.json();
      setOrders(data);
      console.log("orders is", orders);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      {orders &&
        orders.map((order, index) => (
          <div key={index}>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Order # {order._id}
                </h1>
                <h3
                  className={`text-xl my-5 font-bold tracking-tight ${
                    order.status === "pending"
                      ? "text-red-900"
                      : order.status === "dispatched"
                      ? "text-blue-400"
                      : "text-green-500"
                  }`}
                >
                  Order Status : {order.status}
                </h3>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.imageSrc}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.product.name}</a>
                              </h3>
                              <p className="ml-4">${item.product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty :{item.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-2xl pt-3 pb-3 font-semibold underline">
                  Shipping Address
                </p>
                {order.address.address}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
