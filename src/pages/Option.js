import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function Option() {
  const [data, setData] = useState({
    options_types: [],
    options: [],
  });
  const [myUserSid, setMyUserSid] = useState();

  const [seletedItem, setSelectedItem] = useState("");

  const getData = async (shop_sid) => {
    console.log(shop_sid);
    const response = await axios.get(
      `http://localhost:3003/store-admin/option/${shop_sid}`
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
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>使用客製化選項</th>
            <th>說明</th>
          </tr>
        </thead>
        <tbody>
          {data.options_types.map((ot) => {
            return (
              <tr>
                <td>{ot.name}</td>
                <td>
                  {data.options
                    .filter((opt) => {
                      return opt.options_type_sid === ot.sid;
                    })
                    .map((opt) => {
                      return opt.name;
                    })
                    .join()}
                </td>
                <td>至少選{ot.min}項，至多選{ot.max}項</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Option;
