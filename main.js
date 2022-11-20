// Replace: node creation with a function that creates element objects from jsx
// OLD:
// const node = document.createElement(element.type);
// node["title"] = element.props.title;

// const text = document.createTextNode("");
// text["nodeValue"] = element.props.children;
// NEW:

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  // TODO create dom nodes
}

const ConnoReact = {
  createElement,
  render,
};

/** @jsx ConnoReact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

// Replace: Appending with DOM rendering function
// OLD:
// node.appendChild(text);
// root.appendChild(node);
// NEW:
const root = document.getElementById("root");
ConnoReact.render(element, root);
