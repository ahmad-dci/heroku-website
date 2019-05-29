const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const pagesRoutes = require('./src/routes/pagesRoutes');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const app = express();
const port = process.env.PORT || 3000;

// set express urlencoded middelwear
app.use(session({
    secret: "classyadd",
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set views folder
app.set('views', path.join(__dirname, '/src/views'));
// set view engine
app.set('view engine', 'ejs');

// set the public folder
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', pagesRoutes);
app.use('/auth',authRoutes );
app.use('/admin',adminRoutes );

app.post('/newadd', (req, res) => {
    console.log(req.body.somtext);
    res.send(req.body.somtext);
});
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});