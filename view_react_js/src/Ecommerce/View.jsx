import React from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";

export default function View() {
  return (
    <div>
      <Header />
      <ProductList />
      <Cart />
      <Footer />
    </div>
  );
}
