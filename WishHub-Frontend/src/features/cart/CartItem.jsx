import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemFromCartAsync, updateCartAsync } from "./cartSlice";

function CartItem({ product }) {
  const dispatch = useDispatch();
  const quantityHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.name === "increment") {
      const updatedDetails = { id: product.id, quantity: product.quantity + 1 };
      dispatch(updateCartAsync(updatedDetails));
    } else {
      if (product.quantity === 1) dispatch(deleteItemFromCartAsync(product.id));

      const updatedDetails = { id: product.id, quantity: product.quantity - 1 };
      dispatch(updateCartAsync(updatedDetails));
    }
  };

  const removeHandler = (e) => {
    e.preventDefault();
    dispatch(deleteItemFromCartAsync(product.id));
  };

  return (
    <>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.product.imageSrc}
          alt={product.product.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={product.product.href}>{product.product.name}</a>
            </h3>
            <p className="ml-4">{product.product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.product.color}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {product.quantity}</p>
          <div className="text-xl font-bold flex">
            <button
              name="increment"
              className="mx-2 text-xl border border-solid w-5  border-blue-800 shadow-sm shadow-blue-400"
              onClick={quantityHandler}
            >
              +
            </button>
            {`Qty : ${product.quantity} `}
            <button
              name="decrement"
              className="mx-2 text-xl font-bold border border-solid w-5 border-blue-800 shadow-sm shadow-blue-400"
              onClick={quantityHandler}
            >
              -
            </button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={removeHandler}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
