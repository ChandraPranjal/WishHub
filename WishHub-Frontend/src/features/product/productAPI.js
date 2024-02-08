// export function fetchAllProducts() {
//   return new Promise(async (resolve, reject) => {
//     const response = await fetch("http://localhost:8000/products");
//     const data = await response.json();
//     resolve({ data });
//   });
// }

export function fetchAllProducts({ filter, sort, page }) {
  //filter = {
  //              category:["smartphone" , "laptop"] ,
  //              brand:["oppo","samsung"]
  //          }

  let query = "http://localhost:8000/products?";
  // if (filter["category"].length !== 0 || filter["brand"].length !== 0)
  for (let category in filter) {
    query += `${category}=${filter[category][filter[category].length - 1]}&`;
  }
  if (Object.keys(sort).length !== 0) {
    // {_sort="rating",_order="desc"}
    const { _sort, _order } = sort;
    query += `_sort=${_sort}&_order=${_order}`;
  }
  if (Object.keys(page).length !== 0) {
    // { _page: clickedPage, _limit: ITEMS_PER_PAGE }
    const { _page, _limit } = page;
    query += `_page=${_page}&_limit=${_limit}`;
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(query);
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export const fetchProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8000/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
};
