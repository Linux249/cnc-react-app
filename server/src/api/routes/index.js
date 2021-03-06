import passport from 'passport';
import { Router } from 'express';
import layouts from './layouts.js';
import db from './db';
import playerRouter from './player';
import allianceRouter from './alliance';
import urlRouter from './urlshorten';
import ingameData from './ingameData';
import user from './user';
import worlds from './worlds';
import reports from './reports/index';
import performanceRouter from './performance/index';
import layoutsRouter from './layouts/index';
import feedbackRouter from './feedback/index';

const router = Router();

// unprotected Routes
router.post('/ingameData', ingameData);
router.use('/reports', reports);
router.post('/layouts', layouts);
router.use('/', urlRouter);

// AUTH Only for members area
router.use('/', passport.authenticate('jwt', { session: false }));

router.use('/db', db);
router.use('/worlds', worlds);
router.use('/', layoutsRouter);
router.use('/', playerRouter);
router.use('/', allianceRouter);
router.use('/', performanceRouter);
router.use('/feedback', feedbackRouter);

// Protected through login
router.use('/', user);

export default router;
