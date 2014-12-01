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

// (function() {
//   _sheet.insertRule(
//     ".button {  \
//       background-color: lightgray; \
//     }", _sheet.cssRules.length);
// })();

function _getName(obj) {
  return Object.keys(obj)[0];
};

var NavButton = React.createClass({

  getInitialState: function() {
    // return {selected: 'Note'};
    return this.props.selected;
  },

  getParentStyle: function() {
    return {
      // backgroundColor: this.props.backgroundColor || 'lightgray',
      // textAlign: 'center',
      // width: 100 / count + '%',
      // height: 4 + 'em',
      // 'maxWidth': 2 * height + 'em',
      color: (this.props.selected.selected === this.props.name) ? '#4F8EF7' : 'inherit',
      float: 'left',
      width: 100 / this.props.count + '%',
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

  // componentDidUpdate: function(a,b,c) {
  //   console.log("hello world: ",a,b,c);
  // },

  render: function() {
    var self = this;    
    self.props.children = this.props.children || [];
    // console.log(className);
    var subMenu = (self.props.button.buttonList.buttons.length) ? <NavPanel buttonList={self.props.button.buttonList}/> : null;
    if (subMenu) console.log(subMenu);
    return (
      <div>
        {subMenu}
        <li className='button' style={self.getParentStyle.call(self)} onTouchStart={self.props.handleClick}>
          <div className={self.props.iconClass}></div>
          <div className='name'>{this.props.name}</div>
        </li>
      </div>
    )
  },

  // render_OLD: function() {
  //   var self = this;    
  //   this.props.children = this.props.children || [];
  //   return (
  //     <li className='button' style={self.getParentStyle.call(self)} onClick={self.props.handleClick}>
  //       <span style={{bottom:0, position:'absolute'}}>{this.props.name}</span>
  //       <ul style={{'listStyleType': 'none'}}>
  //         {children = this.props.children.map(function(child, i) {
  //           return <li style={self.getChildStyle.call(self, child)} onClick={self.handleChildClick.bind(self, child)} key={i}>{child}</li>;
  //         })}
  //       </ul>

  //     </li>
  //   )
  // }

});

var NavPanel = React.createClass({

  getInitialState: function() {
    var state = {
      selected: this.props.buttonList.getSelectedName(),
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
      <div className='nav-panel-container'>
        <div style={{float: 'right', position:'relative', left:'-50%',  textAlign:'left', width:'100%'}}>
          <ul className='parentButtonPanel'  style={{listStyle: 'none', position: 'relative', margin: 0, left:'50%'}}>
            {self.props.buttonList.buttons.map(function(button, index) {
              name = button.name;
              return (
                <NavButton 
                  name={name}
                  key={index}
                  selected={self.state}
                  handleClick={self.setStateWrapper.bind(self, {selected: name})}
                  handleChildClick={self.setStateWrapper}
                  setStateWrapper={self.setStateWrapper}
                  children={button.children}
                  iconClass={button.iconClass}
                  count={self.props.buttonList.buttons.length}
                  button={button}
                />
            )})}
          </ul>
        </div>
      </div>
    );
  },
});

function Button(name, iconClass, buttonList) {
  this.name = name;
  this.iconClass = iconClass;
  this.buttonList = buttonList || new ButtonList();
};

function ButtonList(selected, buttons) {
  this.selected = selected;
  this.buttons = buttons || [];
};

ButtonList.prototype.getSelectedName = function() {
  return this.buttons[this.selected].name;
}

React.initializeTouchEvents(true);

React.render(<NavPanel buttonList={ new ButtonList(0, [
  new Button('Home', 'ion-home'),
  new Button('Feed','ion-android-sort'),
  new Button('New', 'ion-android-lightbulb', new ButtonList(2, [
    new Button('Delete'),
    new Button('Group'),
    new Button('Note'),
    new Button('Arrow'),
    new Button('More'),
  ])),
  new Button('Search', 'ion-search'), 
  new Button('More', 'ion-chevron-right'),
])}/>, document.getElementById('nav-panel-bottom'));

// React.render(<NavPanel buttons={
//   [
//   {name: 'Home',
//   iconClass: 'ion-home', 
//   children: ['1','2','3']},
//   {name: 'Feed',
//   iconClass: 'ion-android-sort',
//   children: ['4', '5', '6']},
//   {name: 'New',
//   iconClass: 'ion-android-lightbulb', 
//   children: ['Delete', 'Group', 'Note', 'Arrow', 'More']},
//   {name: 'Search',
//   iconClass: 'ion-search', 
//   children: ['7','8','9']},
//   {name: 'More',
//   // iconClass: 'ion-arrow-right-b',
//   iconClass: 'ion-chevron-right',
//   children: []},
//   ]
// }/>, document.getElementById('nav-panel-bottom'));
