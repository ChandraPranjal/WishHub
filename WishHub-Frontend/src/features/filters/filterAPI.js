export const fetchCategories = () => {
  return new Promise(async (resolve, reques) => {
    const response = await fetch("http://localhost:8000/categories");
    const data = await response.json();
    resolve(data);
  });
};

export const fetchBrands = ()=>{
    return new Promise(async (resolve,reject)=>{
        const response = await fetch('http://localhost:8000/brands')
        const data = await response.json();
        resolve(data);
    })
}