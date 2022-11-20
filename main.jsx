import ConnoReact from "./lib/ConnoReact";

/** @jsx ConnoReact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const root = document.getElementById("root");
ConnoReact.render(element, root);
