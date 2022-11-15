import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Menubar() {
  return (
    <>
       <ul>
        <li><Link to='/shop-list'>商店列表</Link></li>
        <li><Link to='/overview'>總覽</Link></li>
        <li><Link to='/type'>商品類別</Link></li>
        <li><Link to='/product'>商品</Link></li>
        <li><Link to='/option'>客製化選項</Link></li>
       </ul>
    </>
  )
}

export default Menubar