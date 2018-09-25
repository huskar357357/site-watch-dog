const 	path 		 = require('path')
const 	express 	 = require('express')
const 	bodyParser 	 = require('body-parser')
const 	cronjob	 	 = require('./cronjob')
const 	cookie		 = require('cookie-session')
const   cookieParser = require('cookie-parser')
const 	app 		 = express()

const 	cronState 	 = cronjob.cronState

// settings
app.engine('html', require('ejs').renderFile)

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

// middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../views')))

cronState.startServerCron()
module.exports = app;
