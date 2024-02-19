export const createOrder= (orderData)=>{
    return new Promise(async(resolve,reject)=>{
        const response = await fetch('http://localhost:3000/api/v1/orders',{
            method:"POST",
            body : JSON.stringify(orderData),
            headers:{'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({data});
    })
}