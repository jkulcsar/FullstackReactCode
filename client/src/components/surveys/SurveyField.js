// SurveyField contains logic to render a single label and text input

import React from 'react';

// using destructuring on the props to read out immediately the input field from it;
// the parameter list of this function is using destructuring two levels down,
// the second level being the destructuring of the error and touched props
// from the meta prop which, in turn is a prop of the input parameter.
export default ({ input, label, meta: { error, touched } }) => {
	//console.log(meta);
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
