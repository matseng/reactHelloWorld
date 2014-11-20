//props, state, setState, render

// var NavPanel = React.createClass({
//   render: function() {
//     return
//   }
// });

var NavButton = React.createClass({displayName: 'NavButton',
  getInitialState: function() {
    this.setDefaultProps();
    return null;
  },

  setDefaultProps: function() {
    this.props.name = this.props.name || "My Button";
    this.props.backgroundColor = this.props.backgroundColor || 'lightgray';
    console.log(this.props);
  },

  onClick: function() {
    console.log(this.props.name);
  },

  render: function() {
    var self = this;
    var style = {backgroundColor: self.props.backgroundColor};
    console.log(style);
    return React.createElement("span", {style: style, onClick: self.onClick}, this.props.name)
  }

});

React.render(React.createElement(NavButton, {name: "Home"}), 
  document.getElementById('nav-panel'));
