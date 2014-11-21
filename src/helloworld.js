//props, state, setState, render

var NavButton = React.createClass({

  getInitialState: function() {
    return {selected: 'Note'};
  },

  setStyle: function() {
    this.style = {
      backgroundColor: this.props.backgroundColor || 'lightgray',
      padding: '10px', 
    };
  },

  onClick: function() {
    if (this.props.onClick) this.props.onClick();
  },

  onChildClick: function(childName) {
    console.log('child clicked:' + childName);
  },

  render: function() {
    var self = this;
    this.setStyle();
    this.style.color = (self.props.selected === this.props.name) ? 'blue' : 'black';
    
    var children;
    if (this.props.children) {
      children = this.props.children.map(function(child, i) {
        return <li onClick={self.onChildClick.bind(self, child)} key={i}>{child}</li>;
      });
    }

    return (
      <li style={self.style} onClick={self.props.onClick}>
        <div>{this.props.name}</div>
        <ul>
          {children}
        </ul>
      </li>
    )
  }

});

var NavPanel = React.createClass({
  
  getInitialState: function() {
    return {selected: 'Home'};
  },

  onClick: function(buttonName) {
    this.setState({selected: buttonName});
    console.log(this.state.selected);
  },

  render: function() {
    var self = this;
    return (
      <ul>
      <NavButton name="Home" onClick={self.setState.bind(this, 'Home')} selected={self.state.selected} key='1'></NavButton>
        <li>
          <div>Feed</div>
        </li>
        <NavButton name="New" onClick={self.onClick.bind(self, "New")} selected={self.state.selected} children={['Delete', 'Group', 'Note', 'Arrow', 'More']} key='2'></NavButton>
        <li>
          <div>Search</div>
        </li>
        <li>
          <div>More</div>
        </li>
      </ul>
    )
  },

  render_OLD: function() {
    var self = this;
    return (
      <div>
        {this.props.buttons.map(function(button, i) {
          var selected = (button.name === self.state.selected) ? true : false;
          console.log(selected);
          return <NavButton key={i} name={button.name} selected={selected} onClick={self.onClick.bind(self, button.name)}></NavButton>;
        })}
      </div>
    );
  }

});

// React.render(<NavButton name='Home'/>, 
//   document.getElementById('nav-panel'));

React.render(<NavPanel buttons={ [{name: 'Home'}, {name: 'Feed'}, {name: 'New'}, {name: 'Search'}, {name: 'Recent'}] }/>,
  document.getElementById('nav-panel'));
