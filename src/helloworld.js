//Built into React: props, state, getInitialState, setState, render, componentDidMount, componentWillUnmount

var NavButton = React.createClass({

  getInitialState: function() {
    return {selected: 'Note'};
  },

  getParentStyle: function() {
    return {
      backgroundColor: this.props.backgroundColor || 'lightgray',
      padding: '10px', 
      color: (this.props.selected === this.props.name) ? 'blue' : 'black',
    };
  },

  getChildStyle: function(child) {
    var color = (child === this.state.selected) ? 'blue' : 'black';
    var visibility = (this.props.selected === this.props.name) ? 'visible' : 'hidden';
    return {color: color, visibility: visibility}
  },

  handleChildClick: function(child) {
    console.log('child clicked:' + child);
    this.setState({selected: child});
  },

  render: function() {
    var self = this;    
    this.props.children = this.props.children || [];
    return (
      <li style={self.getParentStyle.call(self)} onClick={self.props.handleClick}>
        <div>{this.props.name}</div>
        <ul>
          {children = this.props.children.map(function(child, i) {
            return <li style={self.getChildStyle.call(self, child)} onClick={self.handleChildClick.bind(self, child)} key={i}>{child}</li>;
          })}
        </ul>
      </li>
    )
  }

});

var NavPanel = React.createClass({
  
  getInitialState: function() {
    return {selected: 'Home'};
  },

  handleClick: function(state) {  // NOTE: use this handleClick wrapper because can't use 'bind' with setState - not sure why
    console.log("Pre-setState: ", this.state.selected);
    this.setState(state)
    console.log("Post-setState: ", this.state.selected);
  },

  render: function() {
    var self = this;
    console.log("In render: ", this.state.selected);
    return (
      <ul>
        <NavButton 
          name="Home" 
          handleClick={self.handleClick.bind(self, {selected: 'Home'})} 
          selected={self.state.selected} 
          key='1'>
        </NavButton>
        <NavButton
          name="New" 
          handleClick={self.handleClick.bind(self, {selected: "New"})}
          selected={self.state.selected}
          children={['Delete', 'Group', 'Note', 'Arrow', 'More']} 
          key='2'>
        </NavButton>
      </ul>
    )
    // return (
    //   <ul>
    //   // <NavButton name="Home" onClick={self.setState.bind(self, {selected: 'Home'})} selected={self.state.selected} key='1'></NavButton>
    //     <NavButton name="Home" onClick={self.myTest.bind(self, {selected: 'Home'})} selected={self.state.selected} key='1' myKey='1'></NavButton>
    //     <li>
    //       <div>Feed</div>
    //     </li>
    //     <NavButton name="New" onClick={self.onClick.bind(self, "New")} selected={self.state.selected} children={['Delete', 'Group', 'Note', 'Arrow', 'More']} key='2' myKey='2'></NavButton>
    //     <li>
    //       <div>Search</div>
    //     </li>
    //     <li>
    //       <div>More</div>
    //     </li>
    //   </ul>
    // )
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
