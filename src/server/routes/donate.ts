import * as express from 'express';
import charge from '../utils/donate';

const router = express.Router();

/*
	POST localhost:3000/api/donate
	JSON BODY: {
		"token": "YOUR_STRIPE_TOKEN_FROM_CLIENT_SIDE",
		"amount": 5
	}
*/

router.post('/', async (req, res) => {
	try {
		const donateInfo = req.body;
		const result = await charge(donateInfo.token.id, donateInfo.amount);
		res.json({
			result,
			msg: 'donation received'
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

export default router;
