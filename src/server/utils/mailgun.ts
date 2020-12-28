import * as mailgunLoader from 'mailgun-js';
import config from '../config';

// common pattern, you register for a service
// they give you keys, and you use their js library
// to connect your keys to their service!
const mailgun = mailgunLoader({
	apiKey: config.keys.mailgun.secretKey,
	domain: config.keys.mailgun.domain
});

// arbitrary, we could just write this code directly in a route
// but keeping it here in utils lets us re-use it easily elsewhere
const sendEmail = (to: string, from: string, subject: string, content: string) => {
	const data = {
		to,
		from,
		subject,
		text: content
	};
	return mailgun.messages().send(data);
};

export default sendEmail;
