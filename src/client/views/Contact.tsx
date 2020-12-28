import * as React from 'react';

const Contact = (props: ContactProps) => {
	const [email, setEmail] = React.useState<string>('');
	const [subject, setSubject] = React.useState<string>('');
	const [message, setMessage] = React.useState<string>('');

	// we'll use this to let our user know the message was sent
	const [flash, setFlash] = React.useState<string>('');

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const res = await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, subject, message })
		});

		if (res.ok) {
			const result = await res.json();
			// log the response from our api if the email got sent for dev purposes
			console.log(result);
			setEmail('');
			setSubject('');
			setMessage('');
			setFlash('Thank you, your email has been sent!');
		}
	};

	return (
		<main className="container mt-5">
			<section className="row justify-content-center">
				<div className="col-md-6">
					<form className="form-group border rounded-lg shadow-sm p-4">
						<label htmlFor="email">Your Email</label>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							className="form-control mb-3"
						/>
						<label htmlFor="subject">Subject</label>
						<input
							value={subject}
							onChange={e => setSubject(e.target.value)}
							type="text"
							className="form-control mb-3"
						/>
						<label htmlFor="message">Message</label>
						<textarea
							value={message}
							onChange={e => setMessage(e.target.value)}
							rows={5}
							className="form-control mb-3"
						/>
						<button onClick={handleSubmit} className="btn btn-primary">
							Contact Me!
						</button>
					</form>
					{flash && <div className="alert alert-success">{flash}</div>}
				</div>
			</section>
		</main>
	);
};

interface ContactProps {}

export default Contact;
