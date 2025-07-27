import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import PageNotFound from "./PageNotFound/PageNotFound";
import CategoriesPage from "./Categories/Categories";
import AllProducts from "./AllProducts/AllProducts";
import AllSales from "./AllSales/AllSales";
import Cart from "./Cart/Cart";
import CategoryProducts from "./CategoryProducts/CategoryProducts";
import ProductDetails from "./ProductDetails/ProductDetails";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/categories/:categoryId" element={<CategoryProducts />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/sales" element={<AllSales />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Navigation;