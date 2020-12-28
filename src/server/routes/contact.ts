import * as express from 'express';
import sendEmail from '../utils/mailgun';

const router = express.Router();

/*
	POST localhost:3000/api/contact
	JSON BODY: {
		"email": "test@test.com",
		"subject": "test subject",
		"message": "test message"
	}
*/

router.post('/', async (req, res) => {
	try {
		const emailInfo = req.body;
		const result = await sendEmail(
			'przekwas@gmail.com',
			emailInfo.email,
			emailInfo.subject,
			emailInfo.message
		);
		res.json({
			result,
			msg: 'email sent'
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

export default router;
