const express = require('express'),
	morgan = require('morgan');

const app = express();

let favMovies = [{
		title: 'John Wick',
		Director: 'Chad Stahleski & David Leitch'
},
	{
		title: 'Die Hard',
		Director: 'John McTiernan'
},
	{
		title: 'Aliens',
		Director: 'James Cameron'
},
	{
		title: 'Deadpool',
		Director: 'Tim Miller'
},
	{
		title: 'Zombieland',
		Director: 'Ruben Fleischer'
},
	{
		title: 'The 5th Element',
		Director: 'Luc Besson'
},
	{
		title: 'Drive',
		Director: 'Nicholas Winding Refn'
},
	{
		title: 'The Thing',
		Director: 'John Carpenter'
},
	{
		title: 'Unbreakable',
		Director: 'M. Night Shyamalan'
},
	{
		title: 'Terminator 2: Judgement Day',
		Director: 'James Cameron'
}
]

app.use(express.static('public'));

app.use(morgan('common'));

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Oops! Sorry about that, something went wrong!');
});

// GET requests
app.get('/movies', function (req, res) {
	res.json(favMovies)
});

app.get('/', function (req, res) {
	res.send('Welcome to MyFlix')
});

app.get('/documentation', function (req, res) {
	res.sendFile('documentation.html', {
		root: __dirname
	})
});

// listening for requests
app.listen(8080, () =>
	console.log('MyFlix is listening on port 8080.')
);
