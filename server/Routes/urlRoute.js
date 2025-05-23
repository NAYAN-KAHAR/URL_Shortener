
import shortenUrl from '../Controllers/shortenUrl.js';
import getShortenUrl from '../Controllers/getShortenUrl.js';
import urlGet from '../Controllers/urlGet.js';
import deleteUrl from '../Controllers/deleteUrl.js';

import { Router } from 'express'

const router = Router();

router.post('/short', shortenUrl);
router.get('/all/:user', urlGet);
router.get('/:shortUrl', getShortenUrl);
router.delete('/urldelete', deleteUrl)




export default router;