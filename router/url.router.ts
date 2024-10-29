import { Router } from 'express';
import { createShortUrl } from '../controller/url.controller';

const router = Router();


//ROUTES
router.post('/shorten', createShortUrl);

export default router;