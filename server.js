// Dependencies

const path = require('path');
const express = require('express');

// express session to handle session cookies
const session = require('express-session');

// handlebars template engine for front-end
const exphbs = require('express-handlebars');

// initialize server
const app = express();

// define port for server
const PORT = process.env.PORT || 3001;

// sequelize connection to db
const sequelize = require('./config/connection');

// sequelize store to save session so user can remian logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initialize sessions
const sess = {
    secret: 'Super secret secret',
    cookie: { maxAge: 90000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Tell app to use Express Session for session handling
app.use(session(sess));

// handlebars helpers
const helpers = require('./utils/helpers');

// initialize handlebars for html templates
const hbs = exphbs.create({ helpers });

// set handlebars as template engine for server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// have express parse JSON and string data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// give server a path to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// all routes as defined in controllers folder
app.use(require('./controllers/'));

// turn on connection to db then to server
// force: true to reset db and clear all values, updating any new relationships
// force: false to maintain data - aka normal operation
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});