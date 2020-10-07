import React, { useState, useEffect } from "react";

function App() {
  return (
    <div>
      <List />
    </div>
  );
}

// 7
const List = () => {
  const [todos, setTodos] = useState([]);
  // 19
  const [text, setText] = useState([]);

  // 8 注意此处url与mongoClient不同
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:3001/todos");
    // 以下本来是console.log, 15步改成了setTodos
    setTodos(await res.json());
  };
  // 21. 之后去index.js 22
  const addTodo = async () => {
    const res = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ desc: text, done: false }),
    });

    // 24
    fetchTodos();
    setText("");
  };

  // 9
  useEffect(() => {
    fetchTodos();
  }, []);
  // 15, 这一步不 fetch。下一步跳转至index.html, work on css
  const items = todos.map((todo) => (
    // 之前没有fetch, 第30步骤加入fetch，目的是删除之后，自动刷新整个列表
    <Item todo={todo} key={todo._id} fetchTodos={fetchTodos} />
  ));
  // 10 const List需要return 一个东西 否则报错 此时随便return一个div就行
  return (
    // 18
    <div className="ui card">
      <div className="content">
        <div className="header">todo list fast</div>
      </div>
      <div className="content">
        {/* 17 以下一行 在改变index.html之后 */}
        <div className="ui relaxed divided list">{items}</div>
      </div>
      <div className="extra content">
        {/* 18 css， 为了使用{value} 所以19步加入setText */}
        <div className="fluid ui action input">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="ui teal right labeled icon button"
            // 20
            onClick={addTodo}
          >
            <i className="plus icon"></i>
            add
          </button>
        </div>
      </div>
    </div>
  );
};

// 12
const Item = (props) => {
  // 12步时候没有_id
  // 27 加入_id. 之后去index.js后端
  const { done, desc, _id } = props.todo;
  // 26
  const deleteTodo = async () => {
    await fetch(`http://localhost:3001/todos/${_id}`, {
      method: "DELETE",
    });

    // 31
    props.fetchTodos();
  };

  // 33
  const toggleDone = async () => {
    await fetch(`http://localhost:3001/todos/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: !done, desc }),
    });

    props.fetchTodos();
  };

  // 13 此时测试 随便return desc
  return (
    <div className="item">
      {/* 32 */}
      {done ? (
        <i
          className="left floated green check square outline icon"
          onClick={toggleDone}
        ></i>
      ) : (
        <i
          className="left floated square outline icon"
          onClick={toggleDone}
        ></i>
      )}
      {/* 14 */}
      {desc}
      {/* 25 */}
      <i className="right floated red trash icon" onClick={deleteTodo}></i>
    </div>
  );
};

export default App;
