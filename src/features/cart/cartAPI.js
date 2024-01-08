export const addItem = (productInfo) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify(productInfo),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    resolve({ data });
  });
};

export const fetchItemsByUserId = (userId)=>{
    return new Promise(async(resolve,reject)=>{
        const response = await fetch(`http://localhost:8000/cart?userId=${userId}`)
        const data  = await response.json();
        resolve({data})
    })
}

export const updateCart = (update)=>{
    return new Promise(async (resolve,reject)=>{
        const response = await fetch(`http://localhost:8000/cart/${+update.id}`,{
            method:"PATCH",
            body:JSON.stringify(update),
            headers:{'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({data})
    })
}

export const deleteItemFromCart = (itemId)=>{
    return new Promise(async(resolve,reject)=>{
        const response = await fetch(`http://localhost:8000/cart/${itemId}`,{
            method:"DELETE",
            headers:{'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({data : {id:itemId}})
    })
}