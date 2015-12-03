// App.jsx - App component - represents the whole app
App = React.createClass({

	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	// Initializes the .state field of a component which can store
	// encapsulated component data (whaaaaaaaat?)
	getInitialState() {
		return {
			hideCompleted: false
		}
	},

	// Loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData() {
		let query = {};

		if (this.state.hideCompleted) {
			// If hide completed is checked, filter tasks
			query = {checked: {$ne: true}};
		}

		return {
			weeks: Weeks.find({}).fetch(),
			tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
			incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
			teams: Teams.find({}).fetch(),
			currentUser: Meteor.user()
		}
	},

	renderWeeks() {
		return this.data.weeks.map((week) => {
			return <Week key={week._id} week={week} />;
		});
	},

	renderTeams() {
		return this.data.teams.map((team) => {
			return <Team key={team._id} team={team} />;
		});
	},

	toggleHideCompleted() {
		this.setState({
			hideCompleted: ! this.state.hideCompleted
		});
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			const currentUserId = this.data.currentUser && this.data.currentUser._id;
			const showPrivateButton = task.owner === currentUserId;

			return <Task
				key={task._id}
				task={task}
				showPrivateButton={showPrivateButton} />;
		});
	},

	handleSubmit( event ) {
		event.preventDefault();

		// Find the text field via the React ref
		var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Meteor.call( "addTask", text );

		// Clear form
		ReactDOM.findDOMNode(this.refs.textInput).value = "";
	},

	render() {
		return (
			<div className="container">

				<section className="top-bar">
				  <div className="top-bar-left">
				    <ul className="dropdown menu" data-dropdown-menu>
				      <li>
				      	<AccountsUIWrapper />
				      </li>
				      <li className="menu-text">Famball 2015<span> ({this.data.incompleteCount})</span>
				      </li>
				    </ul>
				  </div>
				  <div className="top-bar-right">
				    <ul className="menu">
				      <li className="hide-completed">
				      	<input
				      		type="checkbox"
				      		readOnly={true}
				      		checked={this.state.hideCompleted}
				      		onClick={this.toggleHideCompleted} />
				      		Hide Completed
				      </li>
				      <li>
				      { this.data.currentUser ?
				      	<form className="new-task" onSubmit={this.handleSubmit} >
					      	<input
					      		type="text"
					      		ref="textInput"
					      		placeholder="Type to add new tasks" />
					      </form> : ''
					    }
					    </li>
				    </ul>
				  </div>
				</section>

				<section className="task-list">
					<div className="tasks">
						<header className="taskHeader"><h2>Task List</h2></header>
						<ul>
							{ this.renderTasks() }
						</ul>
					</div>
				</section>

				<section className="comments">
					<CommentBox />
				</section>

				<section className="week-list">
					<div className="weeks">
						<header className="taskHeader"><h2>Week List</h2></header>
						<ul className="accordion" data-accordion role="tablist">
							{ this.renderWeeks() }
						</ul>
					</div>
				</section>

			</div>
		);
	}
});