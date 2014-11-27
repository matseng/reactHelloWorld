//Built into React: props, state, getInitialState, setState, render, componentDidMount, componentWillUnmount

var _sheet = (function() {  // http://davidwalsh.name/add-rules-stylesheets
  // Create the <style> tag
  var style = document.createElement("style");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")

  // WebKit hack :(
  style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.head.appendChild(style);

  return style.sheet;
})();

(function() {
  _sheet.insertRule(
    ".button {  \
      background-color: lightgray; \
    }", _sheet.cssRules.length);
})();

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
    var count = 5;
    var height = 4;
    return {
      // backgroundColor: this.props.backgroundColor || 'lightgray',
      // textAlign: 'center',
      // width: 100 / count + '%',
      // height: 4 + 'em',
      // 'maxWidth': 2 * height + 'em',
      color: (this.props.selected.selected === this.props.name) ? 'blue' : 'black',
      float: 'left',
      // position: 'relative',
      // display: 'block',
    };
  },

  getChildStyle: function(child) {
    // var name = _getName(child);
    // console.log(name);
    var color = (child === this.props.selected[this.props.name].childSelected) ? 'blue' : 'black';
    var visibility = (this.props.selected.selected === this.props.name) ? 'visible' : 'hidden';
    
    return {color: color,
      visibility: visibility,
      float: 'left',
      position: 'absolute',
    };
  },

  handleChildClick: function(child) {
    var obj = {};
    obj[this.props.name] = {childSelected: child};
    this.props.setStateWrapper(obj);
    // console.log('child clicked:' + child);
    // this.state.selected.childSelected = child;
    // this.setState({});
  },

  render: function() {
    var self = this;    
    this.props.children = this.props.children || [];
    return (
      <li className='button' style={self.getParentStyle.call(self)} onClick={self.props.handleClick}>
        <span>{this.props.name}</span>
      </li>
    )
  },

  render_OLD: function() {
    var self = this;    
    this.props.children = this.props.children || [];
    return (
      <li className='button' style={self.getParentStyle.call(self)} onClick={self.props.handleClick}>
        <span style={{bottom:0, position:'absolute'}}>{this.props.name}</span>
        <ul style={{'listStyleType': 'none'}}>
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
    console.log(this.props);
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
    // console.log("Pre-setState: ", this.state.selected);
    this.setState({selected: buttonName});
    // console.log("Post-setState: ", this.state.selected);
  },

  handleChildClick: function(parentName, childName, event) {
    var obj = {};
    if(childName) {
      obj[parentName] = {childSelected: childName || this.state[parentName].childSelected};
      this.setState(obj);
    }
    console.log(obj);
  },

  setStateWrapper: function(state) {
    this.setState(state);
  },

  render: function() {
    var self = this;
    var name;
    return (
      <div style={{float: 'right', position:'relative', left:'-50%',  textAlign:'left'}}>
        <ul className='parentButtonPanel'  style={{listStyle: 'none', position: 'relative', margin: 0, left:'50%'}}>
          {self.props.buttons.map(function(button, index) {
            name = _getName(button);
            return (
              <NavButton 
                name={name}
                key={index}
                selected={self.state}
                handleClick={self.setStateWrapper.bind(self, {selected: name})}
                handleChildClick={self.setStateWrapper}
                setStateWrapper={self.setStateWrapper}
                children={self.props.buttons[index][name]}
                parentElement= {{}}
              />
          )})}
        </ul>
      </div>
    );
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
  {More: []},
  ]
}/>, document.getElementById('nav-panel-bottom'));
