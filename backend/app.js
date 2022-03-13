//RUN npm start TO START

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());


//Import routes
const postsRoute = require('./routes/posts');

app.use('/api/plants', postsRoute);


//ROUTES
app.use(express.static('../public'))
//app.get('/', (req, res) => {
//	res.send('we are on home');
//});

app.get('/posts', (req, res) => {
	res.send('we are on posts');
});

app.get('/api/plants', (req, res) => {
	res.send('we are on posts');
});


//How we start listening to the server
app.listen(3000);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => 
	console.log('Connected to DB')
);