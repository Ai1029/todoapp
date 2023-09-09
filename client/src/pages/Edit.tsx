import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

//カテゴリーの型を宣言
type Category = {
  id: number;
  category: string;
};

// Todoの型を宣言
type Todo = {
  id: number;
  title: string;
  detail?: string;
  completed: boolean;
  categoryID: number;
  category: {
    id: string | number;
    category: string;
  };
};

const Edit = () => {
  const pageId = useLocation();
  const listId = Number(pageId.state.id);
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  //todoリストを取得する
  const [todoData, setTodoData] = useState<Todo[]>([]);
  useEffect(() => {
    //APIからtodoデータを取得する関数を定義
    const fetchList = async () => {
      try {
        //APIからGETをリクエストし、レスポンスからtodoオブジェクトの配列を取得
        const res = await axios.get(`${apiURL}/api/v1/list/${listId}`);
        console.log("list_res", res);
        setTodoData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchList();
  }, []);

  //カテゴリーリストを取得する
  const [categorys, setCategorys] = useState<Category[]>([]);
  useEffect(() => {
    //APIからカテゴリーデータを取得する関数を定義
    const fetchAllCategorys = async () => {
      try {
        //APIからGETをリクエストし、レスポンスからCategoryオブジェクトの配列を取得
        const res = await axios.get(`${apiURL}/api/v1/category`);
        console.log("category_res", res);
        setCategorys(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategorys();
  }, []);

  //セレクトを選択
  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const selectValue = parseInt(e.target.value);
    console.log("選択された値:", selectValue);

    setTodoData((prevTodoElements) => {
      const updatedElements = prevTodoElements.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            categoryID: selectValue,
          };
        }
        return element;
      });
      console.log("setTodoData", setTodoData);
      return updatedElements;
    });
  };

  //タイトルと詳細を編集
  const handleEdit = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "title" | "detail",
    id: number
  ) => {
    console.log("id", id);
    const value = e.target.value;

    setTodoData((prevTodoElements) => {
      const updatedElements = prevTodoElements.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            [field]: value,
          };
        }
        return element;
      });
      return updatedElements;
    });
  };

  // editボタンを押したら、選択と編集したTODOをpatchする
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //リロードを回避
    e.preventDefault();

    const editTodoData = {
      categoryID: todoData[0].categoryID,
      title: todoData[0].title,
      detail: todoData[0].detail,
      completed: false,
    };
    try {
      //APIにPatchリクエストし、更新
      await axios.patch(`${apiURL}/api/v1/list/${listId}`, editTodoData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail">
      <h1>TODO編集</h1>
      <div className="detail-form">
        <form onSubmit={handleSubmit}>
          {todoData.length > 0 &&
            todoData.map((element) => (
              <div key={element.id}>
                <p> Category</p>
                <select
                  className="select_category"
                  value={element.categoryID} // // element.category.id ではなく element.categoryID を使用
                  onChange={(e) => handleSelect(e, element.id)}
                >
                  <option value={0}>-- Please select a category --</option>
                  {categorys.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.id}:{category.category}
                    </option>
                  ))}
                </select>
                <p>※現在選択しているCategory：{element.category.category}</p>
                <p>TODO</p>
                <input
                  type="text"
                  onChange={(e) => handleEdit(e, "title", element.id)}
                  className="input_title"
                  value={element.title}
                  name="title"
                  autoComplete="off"
                ></input>
                <p>TODOの内容</p>
                <input
                  type="text"
                  onChange={(e) => handleEdit(e, "detail", element.id)}
                  className="input_title"
                  value={element.detail}
                  name="explanation"
                  autoComplete="off"
                ></input>
                <button className="editfin_btn">Edit</button>
                <button className="return_btn">
                  <Link to={`/`}>TODO List Page</Link>
                </button>
              </div>
            ))}
        </form>
      </div>
    </div>
  );
};

export default Edit;
