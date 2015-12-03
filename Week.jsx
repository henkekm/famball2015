// Week component - represents a single week in the NFL season
Week = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			matchups: Matchups.find({}).fetch()
		}
	},

	propTypes: {
		// This component gets the week to display through a React prop.
		// We can use propTypes to indicate it is required
		week: React.PropTypes.object.isRequired
	},

	renderMatchups() {
		return this.data.matchups.map((matchup) => {
			return <Matchup key={matchup._id} matchup={matchup} />;
		});
		// return "This is a rendered Matchup."
	},

	render() {
		const hrefIdName = "#week" + this.props.week.weekNumber.toString();
		const weekIdName = "week" + this.props.week.weekNumber.toString();

		return (
		  <li className="accordion-item">
		  	<a href={hrefIdName} role="tab" className="accordion-title" id="panel1d-heading">Week {this.props.week.weekNumber}</a>
				<div id={weekIdName} className="accordion-content" role="tabpanel" data-tab-content>
						{ this.renderMatchups() }
				</div>
			</li>
		);
	}
});