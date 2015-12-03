// Team.jsx - Team component - represents a single team in the NFL
Team = React.createClass({
	propTypes: {
		// This component gets the week to display through a React prop.
		// We can use propTypes to indicate it is required
		team: React.PropTypes.object.isRequired
	},

	selectWinner() {
		// Set the current user's matchup pick to either homeTeam or awayTeam
		// depending on their selection

		// Teams.update(this.props.team._id, {
		// 	// depending on where the slider is, choose homeTeam or awayTeam
		// })
	},

	render() {
		return (
			<div>{this.props.team.displayName}</div>
		);
	}
});