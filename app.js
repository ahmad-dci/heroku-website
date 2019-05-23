const express = require('express');
const path = require('path');
const pagesRoutes = require('./src/routes/pagesRoutes');
const authRoutes = require('./src/routes/authRoutes');
const app = express();
const port = process.env.PORT || 3000;

// set express urlencoded middelwear

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

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});