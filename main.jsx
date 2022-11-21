import ConnoReact from "./lib/ConnoReact";

/** @jsx ConnoReact.createElement */
const element = () => {
  let count = 0;
  const setCount = (count) => count++;
  return (
    <div id="App">
      <h1>Counter</h1>
      <div className="card">
        <button onClick={() => setCount(count)}>count is {count}</button>
      </div>
    </div>
  );
};

const root = document.getElementById("root");
ConnoReact.render(element(), root);
