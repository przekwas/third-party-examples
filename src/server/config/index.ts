import * as dotenv from 'dotenv';

dotenv.config();

export default {
    keys: {
        mailgun: {
            secretKey: process.env.MAILGUN_KEY,
            domain: process.env.MAILGUN_DOMAIN,
        },
        stripe: {
            secretKey: process.env.STRIPE_KEY
        }
    }
}