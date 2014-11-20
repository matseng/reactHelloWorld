//props, state, setState, render

// var NavPanel = React.createClass({
//   render: function() {
//     return
//   }
// });

var NavButton = React.createClass({displayName: 'NavButton',
  getInitialState: function() {
    return null;
  },

  setDefaultProps: function() {
    this.props.name = this.props.name || "My Button";
    this.props.backgroundColor = this.props.backgroundColor || 'light gray';
  },

  onClick: function() {
    console.log(this.props.name);
  },

  render: function() {
    var self = this;
    return React.createElement("span", {onClick: self.onClick}, this.props.name)
  }

});

React.render(React.createElement(NavButton, {name: "Home"}), 
  document.getElementById('nav-panel'));
