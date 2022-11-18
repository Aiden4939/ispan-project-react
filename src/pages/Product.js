import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function Product() {
  const [data, setData] = useState({
    types: [],
    products: [],
    options_types: [],
    only_options_types: [],
  });
  // 找到目前使用者的shop_sid
  const [myUserSid, setMyUserSid] = useState();

  // 目前正在編輯的商品的sid，sid=0就是新增商品。
  const [seletedItem, setSelectedItem] = useState("");
  const [formData, setFormData] = useState({
    src: "",
    name: "",
    price: "",
    type: "",
    options_types: [],
    note: "",
    discount: "",
    available: "",
  });

  const getData = async (shop_sid) => {
    console.log(shop_sid);
    const response = await axios.get(
      `http://localhost:3003/store-admin/product/${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    setMyUserSid(JSON.parse(localStorage.getItem("user")).sid);
    // 取得店家菜單資料
    getData(JSON.parse(localStorage.getItem("user")).sid);
  }, []);

  // 新贓商品的儲存按鈕被按下時
  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://localhost:3003/store-admin/product/${myUserSid}`,
      fd
    );
  };

  // 快速填入
  const fillOutForm = () => {
    document.form1.name.value = "鴛鴦奶茶";
    document.form1.price.value = 70;
    document.form1.type.value = 2;
    document.form1.note.value = "abc";
    document.form1.discount.value = 5;
  };

  // 上傳圖片時
  const uploadHandler = () => {};

  const delBtnHandler = (e) => {
    e.preventDefault();
    const myUser = JSON.parse(localStorage.getItem("user"));
  };

  return (
    <>
      <div
        onClick={() => {
          setSelectedItem(0);
        }}
      >
        新增餐點
      </div>
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
        <tbody>
          {data.products.map((product) => {
            return (
              <tr
                onClick={() => {
                  setSelectedItem(product.sid);
                  setFormData({
                    src: product.sid,
                    name: product.name,
                    price: product.price,
                    type: product.products_type_sid,
                    options_types: data.options_types
                      .filter((ot) => {
                        return product.sid === ot.product_sid;
                      })
                      .map((ot) => {
                        return ot.sid;
                      }),
                    note: product.note,
                    discount: product.note,
                    available: product.available,
                  });
                }}
              >
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
                <td>無</td>
                <td>{product.note}</td>
                <td>{product.available ? "上架中" : "未上架"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {seletedItem === "" ? (
        ""
      ) : (
        <div>
          <form action="" onSubmit={submitHandler} name="form1">
            <label>
              上傳圖片
              <input type="file" name="avatar" />
            </label>

            <label>
              餐點名稱:
              <input
                type="text"
                name="name"
                value={seletedItem ? formData.name : ""}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </label>

            <label>
              餐點價格:
              <input
                type="number"
                name="price"
                value={seletedItem ? formData.price : ""}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                }}
              />
            </label>

            <select
              name="type"
              id=""
              value={seletedItem ? formData.type : ""}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
              }}
            >
              {data.types.map((type) => {
                return <option value={type.sid}>{type.name}</option>;
              })}
            </select>

            <div>
              {data.only_options_types.map((ot) => {
                return (
                  <label>
                    <input
                      key={ot.sid}
                      type="checkbox"
                      name="options_types"
                      value={ot.sid}
                      checked={
                        !seletedItem
                          ? false
                          : formData.options_types.includes(ot.sid)
                      }
                      onChange={(e) => {
                        const newData = { ...formData };
                        const index = newData.options_types.indexOf(ot.sid);
                        index == -1
                          ? newData.options_types.push(ot.sid)
                          : newData.options_types.splice(index, 1);
                        setFormData(newData);
                      }}
                    />
                    {ot.name}
                  </label>
                );
              })}
            </div>

            <label>
              餐點說明:
              <input
                type="text"
                name="note"
                value={seletedItem ? formData.note : ""}
                onChange={(e) => {
                  setFormData({ ...formData, note: e.target.value });
                }}
              />
            </label>

            <label>
              餐點折扣:
              <input
                type="number"
                name="discount"
                value={seletedItem ? formData.discount : ""}
                onChange={(e) => {
                  setFormData({ ...formData, discount: e.target.value });
                }}
              />
            </label>

            <label>
              是否上架:
              <input
                type="checkbox"
                name="available"
                checked={seletedItem ? !!formData.available : true}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    available: e.target.checked ? 1 : 0,
                  });
                }}
              />
            </label>

            <button>儲存</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedItem("");
              }}
            >
              取消
            </button>
            {seletedItem ? <button onClick={delBtnHandler}>刪除</button> : ""}

            <button onClick={fillOutForm}>快速填入</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Product;
