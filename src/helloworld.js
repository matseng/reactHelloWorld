//props, state, setState, render

var NavButton = React.createClass({

  setStyle: function() {
    this.style = {
      backgroundColor: this.props.backgroundColor || 'lightgray',
      padding: '10px', 
    };
  },

  onClick: function() {
    if (this.props.onClick) this.props.onClick();
  },

  render: function() {
    var self = this;
    this.setStyle();
    this.style.color = self.props.selected ? 'blue' : 'black';
    return <span style={self.style} onClick={self.onClick}>{this.props.name}</span>
  }

});

var NavPanel = React.createClass({
  
  getInitialState: function() {
    return {selected: 'Home'};
  },

  onClick: function(buttonName) {
    this.setState({selected: buttonName});
  },

  render: function() {
    var self = this;
    return (
      <div>
        {this.props.buttons.map(function(button, i) {
          var selected = (button.name === self.state.selected) ? true : false;
          console.log(selected);
          return <NavButton key={i} name={button.name} selected={selected} onClick={self.onClick.bind(self, button.name)}/>;
        })}
      </div>
    );
  }

});

// React.render(<NavButton name='Home'/>, 
//   document.getElementById('nav-panel'));

React.render(<NavPanel buttons={ [{name: 'Home'}, {name: 'Feed'}, {name: 'New'}, {name: 'Search'}, {name: 'Recent'}] }/>,
  document.getElementById('nav-panel'));
