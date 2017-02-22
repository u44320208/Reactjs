import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Tasks } from '../api/tasks.js';
 
import Task from './Task.jsx';
 
// App component - represents the whole app
class App extends Component {
   handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  
  hideInputtest() {
	var el = ReactDOM.findDOMNode(this.refs.textInput)
	$(el).fadeToggle();
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
	  
	  <div id="container">
			<h1>To-Do List ({this.props.incompleteCount}) <i className="fa fa-plus" onClick={this.hideInputtest.bind(this)}></i></h1>
			<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
				<input type="text" placeholder="Type to add new tasks" ref="textInput" />
			</form>
			<ul>
				<ReactCSSTransitionGroup transitionName = "listAnimate" transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>
					{this.renderTasks()}
				</ReactCSSTransitionGroup>
			</ul>
		</div>
		
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
	incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
}, App);