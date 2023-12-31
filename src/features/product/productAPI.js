export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters({ filter, sort }) {
  //filter = {
  //              category:["smartphone" , "laptop"] ,
  //              brand:["oppo","samsung"]
  //          }

  let query = "http://localhost:8000/products?";
  console.log("filter",filter);
  // if (filter["category"].length !== 0 || filter["brand"].length !== 0)
  for (let category in filter) {
    query += `${category}=${filter[category][filter[category].length - 1]}&`;
  }
  if (Object.keys(sort).length !== 0) {
    // {_sort="rating",_order="desc"}
    const { _sort, _order } = sort;
    query += `_sort=${_sort}&_order=${_order}`;
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(query);
    const data = await response.json();
    resolve({ data });
  });
}
