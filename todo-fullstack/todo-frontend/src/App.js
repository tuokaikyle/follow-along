import React, { useState, useEffect } from "react";

function App() {
  return (
    <div>
      <h1>备忘录</h1>
      <Frame />
    </div>
  );
}

const Frame = () => {
  // 从后端传来的数据
  const [raw, setRaw] = useState([]);
  // 输入框
  const [text, setText] = useState("");

  // 从后端获取数据，保存于raw
  const fetchAll = async () => {
    const res = await fetch("http://localhost:3001/todos");
    setRaw(await res.json());
  };

  // 只请求一次？
  useEffect(() => {
    fetchAll();
  }, []);

  // 把请求来的大json放在小的component里面
  const upper = raw.map((oneRaw) => (
    <Line key={oneRaw._id} oneRaw={oneRaw} fetch={fetchAll} />
  ));

  const add = async () => {
    // 此处fetch包含两个参数，为url, obj. Obj就是req, 包含method, headers, body
    const res = await fetch("http://localhost:3001/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ desc: text, done: false }),
    });
    // 自动render
    fetchAll();
    // 输入框清0
    setText("");
  };
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">Card</div>
      </div>
      <div className="content">
        <div className="ui relaxed divided list">{upper}</div>
      </div>
      <div className="extra content">
        <div className="fluid ui action input">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="ui teal right labeled icon button" onClick={add}>
            <i className="plus icon"></i>
            add
          </button>
        </div>
      </div>
    </div>
  );
};

const Line = (props) => {
  const { done, desc, _id } = props.oneRaw;
  return <div>{desc}</div>;
};

export default App;
