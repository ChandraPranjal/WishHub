
const filters = [
  {
    id: "category",
    name: "Category",
    // options: [{ value: "New Arrivals", label: "All", checked: true }],
    options: [],
  },
  {
    id: "brand",
    name: "Brands",
    // options: [{ value: "New Arrivals", label: "Apple", checked: false }],
    options: [],
  },
];
const arr = ["anr" , "jjd"];
filters[0].options = arr;


console.log(filters[0].options);