import config from '../config';

// common pattern, you register for a service
// they give you keys, and you use their js library
// to connect your keys to their service!
const stripe = require('stripe')(config.keys.stripe.secretKey);

const charge = (id: string, amount: number) => {
	return stripe.charges.create({
        // id is the token id we get from the client-side
        source: id,
		currency: 'usd',
		// you have to multiply your currency by its minimum value
		// the penny in our case, you look at Stripe docs to see a table of them
		amount: amount * 100,
		description: 'Thanks for Donating!'
	});
};

export default charge;