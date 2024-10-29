import { Router } from 'express';
import { createShortUrl, redirectToMainUrl } from '../controller/url.controller';

const router = Router();


//ROUTES
router.post('/shorten', createShortUrl);
router.get('/:shortUrl', redirectToMainUrl);

export default router;