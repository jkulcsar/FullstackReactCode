// regular expression to validate an email address
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reTrailingComma = '\\s*,\\s*$';

export default emails => {
	//emails = emails.replaceAll(reTrailingComma);

	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		.filter(email => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are not valid: ${invalidEmails}`;
	}

	return;
};
