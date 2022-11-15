import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function Product() {
  const [data, setData] = useState({
    products: [],
    options_types: [],
  });

  // 目前正在編輯的商品的sid，sid=0就是新增商品。
  const [seletedItem, setSelectedItem] = useState(0);

  const getData = async (myUser) => {
    const response = await axios.get(
      `http://localhost:3003/store-admin/product/${myUser}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    const myUser = JSON.parse(localStorage.getItem("user"));

    // 取得店家菜單資料
    getData(myUser.sid);
  }, []);

  const addBtnHandler = () => {
    setSelectedItem(0);
  };

  return (
    <>
      <div onClick={addBtnHandler}>新增餐點</div>
      <table>
        <thead>
          <tr>
            <th>圖片</th>
            <th>名稱</th>
            <th>價格</th>
            <th>類別</th>
            <th>使用客製化選項</th>
            <th>說明</th>
            <th>是否上架</th>
          </tr>
        </thead>
        {data.products.map((product) => {
          return (
            <tr>
              <td>{product.src}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.type_name}</td>
              <td>
                {data.options_types
                  .filter((ot) => {
                    return ot.product_sid === product.sid;
                  })
                  .map((ot) => {
                    return ot.name;
                  })
                  .join()}
              </td>
              <td>{product.note}</td>
              <td>{product.available ? "上架中" : "未上架"}</td>
            </tr>
          );
        })}
      </table>
      {seletedItem === "" ? (
        ""
      ) : (
        <div>
          <form action="">
            <input type="file" />
            <label>
              餐點名稱:
              <input type="text" name="name" />
            </label>
            <label>
              餐點價格:
              <input type="text" name="price" />
            </label>
            <label>
              餐點說明:
              <input type="text" name="note" />
            </label>
            <label>
              餐點折扣:
              <input type="text" name="discount" />
            </label>
          <button>儲存</button>
          <button>取消</button>
          <button>刪除</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Product;
