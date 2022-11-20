//Move ConnoReact to new file

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
  //create element using the JS create element (so a true DOM object)
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  //check if property is a prop or a child
  const isProperty = (key) => key !== "children";

  //pick props, then for each prop assign that to the DOM element we created
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  //recursively add children
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}

export default ConnoReact = {
  createElement,
  render,
};
