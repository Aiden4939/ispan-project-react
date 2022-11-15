import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import EditTypeForm from "../components/EditTypeForm";

function Type() {
  const [data, setData] = useState({
    types: [],
    products: [],
  });

  // 如果sid===''，則隱藏editBox；如果sid===0，則跳出新增的editBox；如果有sid則跳出可修改該type的editBox
  const [editType, setEditType] = useState({
    type_sid: "",
    type_name: "",
  });

  const getData = async (myUser) => {
    const response = await axios.get(
      `http://localhost:3003/store-admin/type/${myUser}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    const myUser = JSON.parse(localStorage.getItem("user"));

    // 取得店家菜單資料
    getData(myUser.sid);
    // console.log(data);
  }, []);

  // 點擊儲存按鈕
  const addBtnHandler = async () => {
    // 因為insert一筆新的資料需要shop_sid，所以先找到localStorage的sid
    const myUserId = JSON.parse(localStorage.getItem("user")).sid;
    const response = await axios.post(
      `http://localhost:3003/store-admin/type/${myUserId}`,
      editType
    );
    console.log(response.data.error);
  };

  const editBtnHandler = async (sid) => {
    const response = await axios.put(
      `http://localhost:3003/store-admin/type/${sid}`,
      editType
    );
  };

  const delBtnHandler = async (sid) => {
    const response = await axios.delete(
      `http://localhost:3003/store-admin/type/${sid}`
    );
  };

  return (
    <>
      <div
        onClick={() => {
          setEditType({ ...editType, type_name: "", type_sid: 0 });
        }}
      >
        新增類別
      </div>
      <table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>項目數量</th>
            <th>項目內容</th>
          </tr>
        </thead>
        <tbody>
          {data.types.map((type, index) => {
            return (
              <tr
                key={type.sid}
                // 點到誰就把editType變成誰
                onClick={() => {
                  setEditType({
                    ...editType,
                    type_sid: type.sid,
                    type_name: type.name,
                  });
                }}
              >
                <td>{type.name}</td>
                <td>
                  {
                    data.products.filter((p) => {
                      return p.products_type_sid === type.sid;
                    }).length
                  }
                </td>
                <td>
                  {data.products
                    .filter((p) => {
                      return p.products_type_sid === type.sid;
                    })
                    .map((p) => {
                      return p.name;
                    })
                    .join()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {editType.type_sid === "" ? (
        ""
      ) : (
        <div>
          <form action="" name="editForm">
            <input
              type="number"
              name="type_sid"
              value={editType.type_sid}
              hidden
            />
            <label>
              類別名稱
              <input
                type="text"
                name="type_name"
                value={editType.type_name}
                onChange={(e) => {
                  setEditType({ ...editType, type_name: e.target.value });
                }}
              />
            </label>
            <button
              onClick={
                editType.type_sid === 0
                  ? addBtnHandler
                  : () => {
                      editBtnHandler(editType.type_sid);
                    }
              }
            >
              儲存
            </button>

            <button
              onClick={() => {
                setEditType({ type_name: "", type_sid: "" });
              }}
            >
              取消
            </button>
            {editType.type_sid === 0 ? (
              ""
            ) : (
              <button
                onClick={() => {
                  delBtnHandler(editType.type_sid);
                }}
              >
                刪除
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default Type;
