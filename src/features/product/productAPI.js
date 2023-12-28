export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter)
{
    //filter = {"category":"smartphone"}

    let query = 'http://localhost:8000/products?';
    for(let key in filter)
    {
        query += `${key}=${filter[key]}&`; 
    }
    console.log("query is",query );
    return new Promise(async (resolve,reject)=>{
        const response = await fetch(query)
        const data = await response.json();
        resolve({data});
    })
}