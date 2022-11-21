const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('./services/passport');
const session = require('cookie-session');

const { isAuth } = require('./services/utils');

const api = require('./routes/api');
const authRouter = require('./routes/auth/auth.router')

const app = express();


app.use(passport.initialize());
app.use(cors({
	origin: 'http://localhost:3001',
    credentials: true
}))
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));

/* Set Cookie Settings */
app.use(
    session({
        name: 'session',
        secret: process.env.COOKIE_SECRET, 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        httpOnly: false,
    })
);
app.use(express.json());


// User Authentication
app.use('/auth/', authRouter)

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/v1', isAuth, api);

app.get('/test', (req, res) => {
    res.send('test')
})

app.post('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.json('You have logged out');
})

app.get('/', (req, res) => {
    console.log(req.user)
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;