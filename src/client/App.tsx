import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Navbar from './components/Navbar';
import Contact from './views/Contact';
import Donate from './views/Dontate';

// make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// and remember nothing on front-end is "protected" so we can paste our public key here
const stripePromise = loadStripe(
	'pk_test_phsxdyVJitFtlwpyKHTNf8lR'
);

const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Contact />
				</Route>
				<Route exact path="/donate">
					{/* this component wraps our form */}
					{/* and acts as "context" that our form can "consume" */}
					{/* aka we can HOOK into it! */}
					<Elements stripe={stripePromise}>
						<Donate />
					</Elements>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
