import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductById,
} from "./productAPI";

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilters",
  async ({ filter, sort, page }) => {
    const response = await fetchAllProducts({ filter, sort, page });
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const res = await fetchProductById(id);
    // console.log("res is" , res.data);
    return res.data;
  }
);



const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

export const productSlice = createSlice({
  name: "productSlicerXYZ",
  initialState: {
    products: [],
    productWithId: null,
    status: "idle",
    totalItems: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      (state.status = "loaded"),
        (state.products = [...state.products, ...action.payload]);
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    });
    builder.addCase(fetchProductsByFilterAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
      const { products, totalItems } = action.payload;
      state.status = "loaded";
      state.products = products;
      state.totalItems = totalItems;
    });

    builder.addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    });
    builder.addCase(fetchProductByIdAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      state.status = "loaded";
      // console.log("action.paload is ",action.payload);
      state.productWithId = action.payload ;
    });
    builder.addCase(fetchProductByIdAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
