import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {
	
  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }
  
  render() {
    return (
	  <li>
		<span><i className="fa fa-trash" onClick={this.deleteThisTask.bind(this)}></i></span> {this.props.task.text}
	  </li>
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};