const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();

const url = new URL("https://example.com");
console.log(url);
const originalParams = url.searchParams;
const obj = {
  brands: ["A", "B"],
  categories: [1, 2, 3],
};

for (let doc in obj) {
  originalParams.append(doc, obj[doc]);
}

let params = new URLSearchParams(url.search);
// console.log("brands", params.getAll("brands"));
// console.log("categories", params.getAll("categories"));

console.log(url.href);
const backendURL = new URLSearchParams(url.href);
console.log(backendURL.getAll("brands"));

// const rcvd =
// // const Myparams = rcvd.params;
// // console.log("brands", params.getAll("brands"));
// // console.log("categories", params.getAll("categories"));
// console.log(rcvd);
app.use(urlencoded());
app.get("/test", (req, res) => {

    console.log(req.query.brands);
    console.log(req.query.categories);

});
app.listen(3002, () => {
  console.log("booted");
});
