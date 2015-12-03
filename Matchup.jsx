// Week component - represents a single week in the NFL season
Matchup = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			teams: Teams.find({}).fetch()
		}
	},

	propTypes: {
		// This component gets the week to display through a React prop.
		// We can use propTypes to indicate it is required
		matchup: React.PropTypes.object.isRequired
	},


	renderTeams() {
		// return this.data.matchups.map((matchup) => {
		// 	return <Matchup key={matchup._id} matchup={matchup} />;
		// });
		return "This is a rendered Team."
	},

	render() {
		return (
			<div>
			{/*
				<div className="task row align-middle centered">Here is where the matchup will be rendered</div>
	      <span className="awayTeam small-2 columns">
	        <img src="http://placehold.it/50x50/f2f2f2" />
	      </span>
				<div className="switch">
				  <input className="switch-input" id="exampleRadioSwitch1" type="radio" checked name="testGroup">
					  <label className="switch-paddle" for="exampleRadioSwitch1">
					  </label>
					</input>
				</div>
	      <span className="homeTeam small-2 columns">
	        <img src="http://placehold.it/50x50/f2f2f2" />
	      </span>
    	*/}
    	<p>Test</p>
      </div>
		);
	}
});