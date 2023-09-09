import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AddList = () => {
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  type Category = {
    id: number;
    category: string;
  };

  const [categorys, setCategorys] = useState<Category[]>([]);

  useEffect(() => {
    //APIからカテゴリーデータを取得する関数を定義
    const fetchAllCategorys = async () => {
      try {
        //APIからGETをリクエストし、レスポンスからCategoryオブジェクトの配列を取得
        const res = await axios.get(`${apiURL}/api/v1/category`);
        console.log("res", res);
        setCategorys(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategorys();
  }, []);

  //セレクトした文字と、インプットした文字を取得する。はじめは空。
  const [selectValue, setSelectValue] = useState(0);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = parseInt(e.target.value, 10);
    setSelectValue(selectValue);
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue1(e.target.value);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue2(e.target.value);
  };

  //ボタンを押したら、TODOを作成する関数を作成
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //リロードを回避
    e.preventDefault();

    const newTodo = {
      categoryID: selectValue,
      title: inputValue1,
      detail: inputValue2,
      completed: false,
    };

    try {
      //APIにPOSTをリクエストして、作成
      await axios.post(`${apiURL}/api/v1/list`, newTodo);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setInputValue1("");
    setInputValue2("");
    setSelectValue(0);
  };

  return (
    <div>
      <h1>TODO List</h1>
      <form className="list-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="list-body">
          <div className="list-info">
            <p>Category</p>
            <select
              name="category"
              className="select_category"
              onChange={(e) => handleSelect(e)}
            >
              <option>-- Please select a category --</option>
              {categorys.map((category) => (
                <option value={category.id}>
                  {category.id}:{category.category}
                </option>
              ))}
            </select>
          </div>
          <div className="list-info">
            <p>TODO</p>
            <input
              type="text"
              onChange={(e) => handleChange1(e)}
              className="input_title"
              placeholder="例 : Expressを学ぶ"
              name="input_todo"
              autoComplete="off"
            ></input>
          </div>
          <div className="list-info">
            <p>TODO内容</p>
            <input
              type="text"
              onChange={(e) => handleChange2(e)}
              className="input_detail"
              placeholder="例 : ExpressをDockerで立ち上げる"
              autoComplete="off"
            />
          </div>
        </div>
        <button type="submit" className="create_btn">
          Create TODO
        </button>
      </form>
    </div>
  );
};

export default AddList;
