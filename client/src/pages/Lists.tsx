import React, { useState, useEffect } from "react";
import axios from "axios";
import AddList from "../compornents/AddList";
import { Link } from "react-router-dom";

const Lists = () => {
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  // Todoの型を宣言
  type Todo = {
    id: number;
    title: string;
    detail?: string;
    completed: boolean;
    category: {
      id: number;
      category: string;
    };
  };

  const [lists, setLists] = useState<Todo[]>([]);

  useEffect(() => {
    //APIからTodoデータを取得する関数を定義
    const fetchAllLists = async () => {
      try {
        //APIからGETをリクエストし、レスポンスからTodoオブジェクトの配列を取得
        const res = await axios.get(`${apiURL}/api/v1/list`);
        console.log("res", res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllLists();
  }, []);

  //削除ボタンを押すとリストが消える
  const handleDelete = async (id: number) => {
    //一旦idがあっているか確認
    // alert(id);
    try {
      await axios.delete(`${apiURL}/api/v1/list/` + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // チェックボックスのチェック有り無し動作
  const handleChecked = (id: number, checked: boolean) => {
    const newList = lists.map((list) => {
      if (list.id === id) {
        list.completed = !checked;

        // mysqlのデータも修正する
        updateListStatus(id, !checked);
      }
      return list;
    });
    setLists(newList);
  };

  const updateListStatus = async (id: number, completed: boolean) => {
    try {
      await axios.patch(`${apiURL}/api/v1/list/${id}`, {
        completed: completed,
      });
      console.log("成功");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddList />
      <div className="lists">
        {lists.map((list) => (
          <div className="list-container" key={list.id}>
            <div className={`list ${list.completed ? "completed" : ""}`}>
              <input
                type="checkbox"
                checked={list.completed}
                onChange={() => handleChecked(list.id, list.completed)}
              />
              <p>Category: </p>
              <h4>{list.category.category}</h4>
              <p>TODO: </p>
              <h4>{list.title}</h4>
            </div>
            <div className="buttons">
              <button className="detail_btn">
                <Link to={`/Eachlist/${list.id}`} state={{ id: list.id }}>
                  More details
                </Link>
              </button>
              <button
                className="delete_btn"
                onClick={() => {
                  handleDelete(list.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
