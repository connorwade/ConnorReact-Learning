import ConnoReact from "./lib/ConnoReact";

/** @jsx ConnoReact.createElement */
function App(props) {
  let count = 0;
  const setCount = (count) => count++;
  return (
    <div id="App">
      <h1>{props.title}</h1>
      <div className="card">
        <button onClick={() => setCount(count)}>count is {count}</button>
      </div>
    </div>
  );
}
// We are now closer this implemenation
// const element = <App title="Counter" />;
const element = App({ title: "Counter" });

const root = document.getElementById("root");
ConnoReact.render(element, root);
