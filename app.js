if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// npm i -g npm-check-updates
// ncu -u
// npm i 
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const session = require('express-session');
const flash = require('connect-flash')
// const passport = require('passport');
// const localStrategy = require('passport-local')
const _passport = require('./utilitis/passport')

const ExpressError = require('./utilitis/ExpressError');
const userRoute = require('./Routes/userRoute')
const campgroundRoute = require('./Routes/campgroundRoute')
const reviewRoute = require('./Routes/reviewRoute')
const oAuthRoute = require('./Routes/oAuth')
const User = require('./models/user')

 //mongoose.connect(process.env.MONGO_DB, {
     mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
// use for reading params
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, 'public')))

const sessionOptions = {
    secret: 'Neeraj',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionOptions))
app.use(flash())
// passport.session must be after session

// app.use(passport.initialize()); // for initialise the passport
// app.use(passport.session()); // for making your application for persistent login session
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser()); // for serialise the users into the sessions
// passport.deserializeUser(User.deserializeUser());

_passport.passportInit(app);
app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.get('/', async (req, res) => {
    res.render('home')
})

app.use('/', userRoute);
app.use('/auth', oAuthRoute)
app.use('/campgrounds', campgroundRoute)
app.use('/campgrounds/:id/reviews', reviewRoute)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
    // res.send('Page Not Found');
})
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) { err.message = 'Oh NO, Something Went Wrong !' }
    res.status(status).render('campgrounds/error', { error: err });
})
app.listen(3030, () => {
    console.log('Listening on Port 3030!')
})

