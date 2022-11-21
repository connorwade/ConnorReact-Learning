import ConnoReact from "./lib/ConnoReact";

/** @jsx ConnoReact.createElement */
function App(props) {
  const [count, setCount] = ConnoReact.useState(1);
  return (
    <div id="App">
      <h1>{props.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

const element = <App title="Counter" />;

const root = document.getElementById("root");
ConnoReact.render(element, root);
