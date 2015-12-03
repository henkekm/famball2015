// Task.jsx - Task component - represents a single todo item
Task = React.createClass({
	propTypes: {
		// This component gets the task to display through a React prop.
		// We can use propTypes to indicate it is required
		task: React.PropTypes.object.isRequired,
		showPrivateButton: React.PropTypes.bool.isRequired
	},

	toggleChecked() {
		// Set the checked property to the opposite of its current value
		Meteor.call( "setChecked", this.props.task._id, ! this.props.task.checked );
	},

	togglePrivate() {
		// Set the private property to the opposite of its current value
		Meteor.call( "setPrivate", this.props.task._id, ! this.props.task.private )
	},

	deleteThisTask() {
		Meteor.call( "removeTask", this.props.task._id );
	},

	render() {
		// Give tasks a different className when they are checked off
		// so that we can style them nicely
		const taskClassName = ( this.props.task.checked ? "checked" : "" ) + " " +
			( this.props.task.private ? "private" : "" );

		return (
      <li className={taskClassName}>
      	<button className="delete" onClick={this.deleteThisTask} > &times; </button>
      	<input
      		type="checkbox"
      		readOnly={true}
      		checked={ this.props.task.checked }
      		onClick={ this.toggleChecked } />

      	<span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
    		{ this.props.showPrivateButton ? (
    			<button className="toggle-private button tiny" onClick={ this.togglePrivate }>
    			  { this.props.task.private ? "Private" : "Public"}
    			</button>
    		) : '' }
      </li>
		);
	}
});