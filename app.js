const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = require('./routes/api-endpoints/apiRoutes');
const appRouter = require('./routes/app/appRoutes');
const loginRouter = require('./routes/app/loginRoutes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({
    secret: '123214sdaqweq',
    resave: true,
    saveUninitialized: false
}));


//Página principal del api, allí estará ubicada toda la documentación respectiva
app.use('/app', appRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.get('/', (req, res) => {
  res.redirect('/app');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error')
});

module.exports = app;
