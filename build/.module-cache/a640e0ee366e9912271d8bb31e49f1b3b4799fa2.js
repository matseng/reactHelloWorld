//state, props, getInitialState, setState, componentDidMount, componentWillUnmount, render

// function helloWorld() {
//   console.log("hello world");
// };

var Greeting = React.createClass({displayName: 'Greeting',
  
  getInitialState: function() {
    return {name: props.name, greeting: props.greeting};
  },

  render: function() {
    console.log(greeting + ", " + name);
  }

});

React.renderComponent(React.createElement(Greeting, {name: "mikey", greeting: "hellooo"}), 
  document.getElementById('example'));


