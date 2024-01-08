export const createOrder= (orderData)=>{
    return new Promise(async(resolve,reject)=>{
        const response = await fetch('http://localhost:8000/orders',{
            method:"POST",
            body : JSON.stringify(orderData),
            headers:{'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({data});
    })
}