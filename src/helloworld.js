//Built into React: props, state, getInitialState, setState, render, componentDidMount, componentWillUnmount

function _getName(obj) {
  return Object.keys(obj)[0];
};

var NavButton = React.createClass({

  getInitialState: function() {
    // return {selected: 'Note'};
    return this.props.selected;
  },

  getParentStyle: function() {
    // console.log(this.props.selected[this.props.name].selected);
    return {
      backgroundColor: this.props.backgroundColor || 'lightgray',
      padding: '10px', 
      color: (this.props.selected.selected === this.props.name) ? 'blue' : 'black',
    };
  },

  getChildStyle: function(child) {
    var color = (child === this.state.selected.childSelected) ? 'blue' : 'black';
    var visibility = (this.props.selected.selected) ? 'visible' : 'hidden';
    return {color: color, visibility: visibility}
  },

  handleChildClick: function(child) {
    // console.log('child clicked:' + child);
    // this.state.selected.childSelected = child;
    this.setState(this.state.selected.childSelected = child);
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
    // return {selected: 'Home'};
    // var state = {
    //   Home: {selected: false, childSelected: '1'},
    //   Feed: {selected: false, childSelected: '5'},
    //   New: {selected: true, childSelected: 'Note'},
    //   Search: {selected: false, childSelected: '9'},
    //   More: {selected: false, childSelected: null}
    // };
    var state = {
      selected: "New",
      Home: {childSelected: '1'},
      Feed: {childSelected: '5'},
      New: {childSelected: 'Note'},
      Search: {childSelected: '9'},
      More: {childSelected: null}
    };
    return state;
  },

  handleClick: function(buttonName) {  // NOTE: use this handleClick wrapper because can't use 'bind' with setState - not sure why
    console.log("Pre-setState: ", this.state.selected);
    // var obj = {};
    // obj[buttonName] = {selected: true};
    this.setState({selected: buttonName});
    console.log("Post-setState: ", this.state.selected);
  },

  render: function() {
    var self = this;
    console.log(self.props);
    return (
      <ul>
        {self.props.buttons.map(function(button, key) {
          return (
            <NavButton 
              name={_getName(button)}
              key={key}
              selected={self.state}
              handleClick={self.handleClick.bind(self, _getName(button))}
            />
        )})}
      </ul>
    );
  },
  // render: function() {
  //   var self = this;
  //   console.log(self.props);
  //   return (
  //     <ul>
  //       {self.props.buttons.map(function(button, key) {
  //         return 
  //           <NavButton 
  //             name={_getName(button)}
  //             key={key}
  //             handleClick={self.handleClick.bind(self,_getName(button))}
  //             selected={button}
  //           />
  //       })}
  //     </ul>
  //   );
  // },

  render_OLD: function() {
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
  },

});

// React.render(<NavButton name='Home'/>, 
//   document.getElementById('nav-panel'));

// React.render(<NavPanel buttons={ [{name: 'Home'}, {name: 'Feed'}, {name: 'New'}, {name: 'Search'}, {name: 'Recent'}] }/>,
React.render(<NavPanel arr={[1,2,3]} buttons={
  [
  {Home: ['1','2','3']},
  {Feed: ['4', '5', '6']},
  {New: ['Delete', 'Group', 'Note', 'Arrow', 'More']},
  {Search: ['7','8','9']},
  {More: null},
  ]
}/>, document.getElementById('nav-panel'));
