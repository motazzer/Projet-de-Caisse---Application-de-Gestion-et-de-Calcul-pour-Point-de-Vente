const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');
var methodOverride = require('method-override');

const { Logger } = require('./util');
const Middleware = require('./middleware');

const { DB } = require('./config');

const router = require('./routes');

const app = express();
const PORT = 3000;

// Middleware
// enabling cross origin
app.use(cors());
// Static folder
app.use(express.static(path.join(__dirname, 'public')));
// Treats Json cookies and X-HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Logging to file Log/server.log
app.use(Middleware.Logger);
// Treating custom methods in html
app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			var method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

// Setting view engine as handlebars
hbs = exphbs.create({
	defaultLayout: false,
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	extname: 'hbs',
});
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);

// Setting Routes
app.use('/', router);

function run() {
	DB.sequelize.sync().then(async () => {
		app.listen(PORT, 'localhost', () => {
			Logger.success(`server running on http://localhost:${PORT}`);
		});
	});
}

run();
