/* We need a fiber tree for this part

Fiber Trees are a type of Data Structure

For every element, we have one fiber and for every fiber, we will have one unit of work

For each unit of work will do the following:

1. add the element to the DOM
2. create the fiber for element's children
3. select the next unit of work

To decide the next fiber we first look if the fiber has a child
If it has a child, we move to the child
If it has no child, we move to the sibling
If it has no sibling, we go to the sibling of the parent

*/

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

// Refacture the render function
//OLD:
// function render(element, container) {
//   const dom =
//     element.type == "TEXT_ELEMENT"
//       ? document.createTextNode("")
//       : document.createElement(element.type);

//   const isProperty = (key) => key !== "children";

//   Object.keys(element.props)
//     .filter(isProperty)
//     .forEach((name) => {
//       dom[name] = element.props[name];
//     });

//   element.props.children.forEach((child) => render(child, dom));
//   container.appendChild(dom);
// }
// NEW:
//change render to createDom and change element to fiber
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  const isProperty = (key) => key !== "children";

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}

//change render to take element that creates an element
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

// Concurrency
let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// rename unitOfWork paramater to fiber
function performUnitOfWork(fiber) {
  // Add element to the DOM
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // Create the next fiber
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
  // return next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

const ConnoReact = {
  createElement,
  render,
};

export default ConnoReact;
