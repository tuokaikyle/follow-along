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
  const [raw, setRaw] = useState([]);
  const [text, setText] = useState("");
  const fetchAll = async () => {
    const res = await fetch("http://localhost:3001/todos");
    setRaw(await res.json());
  };
  useEffect(() => {
    fetchAll();
  }, []);
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
