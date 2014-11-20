//state, props, getInitialState, setState, componentDidMount, componentWillUnmount, render

// function helloWorld() {
//   console.log("hello world");
// };

var Greeting = React.createClass({
  
  getInitialState: function() {
    return {name: this.props.name, greeting: this.props.greeting};
  },

  render: function() {
    var str = this.state.greeting + ", " + this.state.name;
    console.log(str);
    return <div>{str}</div>
  }

});

React.render(<Greeting name='mikey' greeting='hellooo'/>, 
  document.getElementById('example'));


