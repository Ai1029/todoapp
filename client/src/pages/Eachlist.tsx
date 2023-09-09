import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Eachlist = () => {
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  const pageId = useLocation();
  const listId = Number(pageId.state.id);
  // Todoの型を宣言
  type Todo = {
    id: number;
    title: string;
    detail?: string;
    completed: boolean;
    category: {
      categoryID: number;
      category: string;
    };
  };

  const [list, setList] = useState<Todo[]>([]);

  useEffect(() => {
    // APIからidがあっているTodoデータを取得する関数を定義;
    const List = async () => {
      try {
        //APIからGETをリクエストし、レスポンスからTodoオブジェクトの１つの配列を取得
        const res = await axios.get(`${apiURL}/api/v1/list/${listId}`);
        console.log("res", res);
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    List();
  }, []);

  return (
    <div className="detail">
      <h1>TODO詳細</h1>

      {list.map((element) => (
        <>
          <p>Category</p>
          <h4>{element.category.category}</h4>
          <p>TODO</p>
          <h4>{element.title}</h4>
          <p>TODOの内容</p>
          <h4>{element.detail}</h4>
          <button className="edit_btn">
            <Link to={`/Edit/${element.id}`} state={{ id: element.id }}>
              Edit Page
            </Link>
          </button>
        </>
      ))}
    </div>
  );
};

export default Eachlist;
