export const fetchLoggerInUserOrders = (id)=>{
    return new Promise(async (resolve,reject)=>{
        const response = await fetch(`http://localhost:8000/orders?userId=${id}`)
        const data = await response.json();
        resolve ({data});
    })
}

