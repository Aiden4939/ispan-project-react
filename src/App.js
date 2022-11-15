import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Overview from "./pages/Overview";
import Type from "./pages/Type";
import Product from "./pages/Product";
import Option from "./pages/Option";
import Menubar from "./components/Menubar";
import ShopList from "./pages/ShopList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/type" element={<Type />} />
          <Route path="/product" element={<Product />} />
          <Route path="/option" element={<Option />} />
          <Route path="/shop-list" element={<ShopList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
