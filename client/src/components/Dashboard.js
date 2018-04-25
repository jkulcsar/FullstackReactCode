import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
	return (
		<div>
			<SurveyList />
			<div className="fixed-action-btn">
				<Link
					style={{ position: 'absolute', bottom: '50px', right: '50px' }}
					to="/surveys/new"
					className="btn-floating btn-large red waves-effect waves-light"
				>
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
