// protect routes with user authentication

import jwt from 'next-auth/jwt';
import { connectDB } from './db';

let db;

/**
 * not a real express next but its work great that way to handle errors
 * @param res
 * @return {function(*=): *}
 */
const next = res => err => res.json(err);

export const middleware = (handler, options = {}) => async (req, res) => {
    console.log('API:   ', req.method, req.url, req.query, req.body);

    // return handler(req, res, next(res));
    if (options.db) {
        try {
            if (!db) db = await connectDB();
            req.db = db;
        } catch (e) {
            return next(res)({
                status: e.status || 666,
                message: e.message || 'unhandled error',
                error: e,
            });
        }
    }

    if (options.auth) {
    }
    if (options.cors) {
    }
    return handler(req, res, next(res));
};

const secret = process.env.JWT_SECRET;

export const authMiddleware = handler => async (req, res) => {
    const token = await jwt.getToken({ req, secret });
    if (token) {
        req.user = token;
        handler(req, res);
    } else {
        // todo Not Signed in
        res.status(401);
        res.end();
    }
};
export default middleware;