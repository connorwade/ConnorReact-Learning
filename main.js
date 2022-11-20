//1. We breakdown our HTML node to an JS object
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
};
//2. We grab the root of our HTML file
const root = document.getElementById("root");
//3. We build the node from JS object
const node = document.createElement(element.type);
node["title"] = element.props.title;
//4. We set the text within the node
const text = document.createTextNode("");
text["nodeValue"] = element.props.children;
//5. We append text to the node and then we append the node to the root
node.appendChild(text);
root.appendChild(node);
