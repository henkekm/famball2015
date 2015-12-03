// famball2015-react.jsx - App's main react file
// controlling the highest level Meteor code

Tasks = new Mongo.Collection("tasks");
Weeks = new Mongo.Collection("weeks");
Matchups = new Mongo.Collection("matchups");
Teams = new Mongo.Collection("teams");

if( Meteor.isClient ) {
	// Include all functionality for Foundation AS IS
	// Will probably want to get more control over each of these in the future
	Template.body.onRendered( function() {
		$( document ).foundation();
	});

	// Adjust Blaze's ui component
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});

	Meteor.subscribe( "tasks" );
	Meteor.subscribe( "weeks" );

	Meteor.startup( function() {
		// Use Meteor.startup to render the component after the page is ready
		ReactDOM.render( <App />, document.getElementById("render-target"));
	});
}

if( Meteor.isServer ) {
	// Only publish tasks that are public or belong to the current user
	Meteor.publish( "tasks", function() {
		return Tasks.find({ 
			$or: [
				{ private: {$ne: true} },
				{ owner: this.userId }
			]
		});
	});

	Meteor.publish( "weeks", function() {
		return Weeks.find();
	});
}

Meteor.methods({
	addTask( text ) {
		// Make sure the user is logged in before inserting a task
		if ( ! Meteor.userId() ) {
			throw new Meteor.Error( "not-authorized" );
		}

		Tasks.insert({
			text: text,
			createdAt: new Date(), 						// current time
			owner: Meteor.userId(),						// _id of user who is logged in
			username: Meteor.user().username	// username of user who is logged in
		});
	},

	removeTask( taskId ) {
		const task = Tasks.findOne( taskId );

		// if (task.owner !== Meteor.userId()) { // Will make it so only task owners can remove tasks belonging to themselves
		if (task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error( "not-authorized" );
		}

		Tasks.remove( taskId );
	},

	setChecked( taskId, setToChecked ) {
		const task = Tasks.findOne( taskId );

		if (task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error( "not-authorized" );
		}
		
		Tasks.update( taskId, { $set: { checked: setToChecked } });
	},

	setPrivate( taskId, setToPrivate ) {
		const task = Tasks.findOne( taskId );

		if ( task.owner !== Meteor.userId() ) {
			throw new Meteor.Error( "not-authorized" );
		}

		Tasks.update( taskId, { $set: { private: setToPrivate } } );
	}
})