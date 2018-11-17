import passport from 'passport';
import { Router } from 'express';
import layouts from './layouts';
import db from './db';
import playerRouter from './player';
import allianceRouter from './alliance';
import ingameData from './ingameData';
import user from './user';
import worlds from './worlds';
import layoutsRouter from './layouts/index';

const router = Router();

// unprotected Routes
router.post('/ingameData', ingameData);
router.post('/layouts', layouts);

// AUTH Only for members area
router.use('/', passport.authenticate('jwt', { session: false }));

router.use('/worlds', worlds);
router.use('/', layoutsRouter);
router.use('/', playerRouter);
router.use('/', allianceRouter);

// Protected through login
router.use('/', user);

// TODO that should be higher protected (Admin role)
router.use('/', db);

export default router;
