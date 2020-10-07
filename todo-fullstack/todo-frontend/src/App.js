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
  return <div>{upper}</div>;
};

const Line = (props) => {
  const { done, desc, _id } = props.oneRaw;
  return <div>{desc}</div>;
};

export default App;
