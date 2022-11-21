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
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}

//add concurrency
let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false; // We shouldn't our work stream unless we are interupted by another process
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // set the next unit of work using the current unit of work
    shouldYield = deadline.timeRemaining() < 1; // yield if the deadline is < 1
  }
  requestIdleCallback(workLoop); // requestIdleCallback is a JS library function that calls a function only when nothing else is running
  //deadline is defined from the function
}

requestIdleCallback(workLoop); //start the process

function performUnitOfWork(nextUnitOfWork) {
  //TODO
}

const ConnoReact = {
  createElement,
  render,
};

export default ConnoReact;
