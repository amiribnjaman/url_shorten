import { Router } from 'express';
import { createShortUrl, redirectToMainUrl, shortUrlStats } from '../controller/url.controller';

const router = Router();


//ROUTES
router.post('/shorten', createShortUrl);
router.get('/:shortUrl', redirectToMainUrl);
router.get('/stats/:shortUrl', shortUrlStats);

export default router;