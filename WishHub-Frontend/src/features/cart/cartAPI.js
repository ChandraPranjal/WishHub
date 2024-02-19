export const addItem = (productInfo) => {
  // console.log(productInfo);
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:3000/api/v1/carts", {
      method: "POST",
      body: JSON.stringify(productInfo),
      headers: { "content-type": "application/json" },
    });

    const newData = await response.json();
    resolve({ data: newData });
  });
};

export const fetchItemsByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:3000/api/v1/carts?userId=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
};

export const updateCart = (updatedDetails) => {
  console.log(updatedDetails.id);
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:3000/api/v1/carts/${updatedDetails.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedDetails),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
};

export const deleteItemFromCart = (itemId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:3000/api/v1/carts/${itemId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
};

export const resetCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/carts?userId=${userId}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
};
