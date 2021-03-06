import express from 'express';
import passport from 'passport';
import MongoClient from 'mongodb';
import schedule from 'node-schedule';
import cors from 'cors';
import logging from 'morgan';
import mongoose from 'mongoose';
import apiRouter from './routes';
import configurePassport from './config/passport';
import { createReport } from './service/report';
import { mongoURI } from './config/config';
import setAuthRout from './routes/auth';

let DB;

// configuration ===============================================================
MongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, client) => {
    DB = client.db('heroku_0ghkd985');
    const j = schedule.scheduleJob({ hour: 0, minute: 32 }, () => {
        console.log('SCHEUDLER');
        createReport(DB);
    });
});

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);
const db = mongoose.connection; // simplification

// falls Fehler kommen so ausgeben
db.on('error', err => {
    console.error('Fehler von DB:', err);
});

// nach erfolgreichem verbinden
db.once('open', () => {
    console.log('db connection succesful');
});

// Create the express app
const app = express();

app.use((req, res, next) => {
    req.db = DB;
    next();
});
// const allow = procces.env.

// TO
app.use((req, res, next) => {
    const origin = req.get('origin');
    const host = req.get('host');
    //  set all headers to allowed
    res.setHeader('Access-Control-Allow-Origin', origin || host || '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH,DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// zeigt verschiedene logs in der Console an
// app.use(logger("dev"))
// nutzt den body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.use(cors());

configurePassport(passport);

app.use(logging('dev'));
// app.use(flash()); // use connect-flash for flash messages stored in session

/* app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 100,
        keys: [cookieSecret],
    })
); */
app.use(passport.initialize());
// app.use(passport.session());

// routes ======================================================================

// set router for the API
setAuthRout(app, passport);
app.use('/', apiRouter);

// usage from example
// app.use('/user', passport.authenticate('jwt', {session: false}), user);
// https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314

app.use('/task/index.php', (req, res) => {
    if (req.get('content-type') === 'application/x-www-form-urlencoded') {
        console.log('TODO - DAS IN DIE db ODER SONST WO ANSCHAUEN');
        console.log(req);
    }
});

// wenn der Request bis hierhin nicht 'abgefangen' wurde:
// Eigener Error handler der errors als json! zurück schickt.
app.use((req, res, next) => {
    const message = `link nicht gültig -: ${req.url}`;
    const err = new Error(message);
    err.status = 404;
    next(err);
});

// Error Handler - Server error
app.use((err, req, res, next) => {
    console.warn(err.message);
    console.error(err);
    res.status(err.status || 500); // falls irgendwo? next(err) aufgerufne wurde hat es wie oben eine status bekommen
    res.json({
        error: {
            message: err.message,
        },
        status: err.status || 500,
    });
});

module.exports = app;
