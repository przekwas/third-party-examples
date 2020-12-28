import * as React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Donate = (props: DonateProps) => {
	// hook into our conntected front-end stripe context provider
	// which we'll use to tokenize a person's card
	const stripe = useStripe();

	// hook into the individual element or elements they give us for CC info
	const elements = useElements();

	const [amount, setAmount] = React.useState<string>('');

	// we'll use this to let our user know the donation went through
	const [flash, setFlash] = React.useState<string>('');

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// if our hooks failed to consume a provider's context
		// we should prolly not run any of this function
		if (!stripe || !elements) return;

		// get the context of our chosen element, in this case the CardElement component
		const cardElement = elements.getElement(CardElement);
		// use stripe to take their info and tokenize it for us
		const { token, error } = await stripe.createToken(cardElement);

		if (error) {
			// stop the function here if the tokenizing step failed
			console.log('stripe error', error);
			return;
		} else {
			// take the token, the amount, and hit our donate route!
			const res = await fetch('/api/donate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount, token })
			});

			if (res.ok) {
				const result = await res.json();
				// log the response from our api if the donation got sent for dev purposes
				console.log(result);
				// this is how we empty their element for the CC info
				cardElement.clear();
				setAmount('');
				setFlash('Thank you for the donation!');
			}
		}
	};

	return (
		<main className="container mt-5">
			<section className="row justify-content-center">
				<div className="col-md-6">
					<form className="form-group border rounded-lg shadow-sm p-4">
						<label htmlFor="amount">Amount</label>
						<input
							value={amount}
							onChange={e => setAmount(e.target.value)}
							type="number"
							className="form-control mb-3"
						/>
						<CardElement className="form-control mb-3" />
						<button onClick={handleSubmit} className="btn btn-primary">
							Donate to Me!
						</button>
					</form>
					{flash && <div className="alert alert-success">{flash}</div>}
				</div>
			</section>
		</main>
	);
};

interface DonateProps {}

export default Donate;
