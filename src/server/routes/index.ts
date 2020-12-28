import * as express from 'express';
import donateRouter from './donate';
import contactRouter from './contact';

const router = express.Router();

router.use('/donate', donateRouter);
router.use('/contact', contactRouter);

export default router;