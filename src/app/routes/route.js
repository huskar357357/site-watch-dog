////////////////////////////////////////////////
//                                            //
//            This is my own Route            //
//                                            //
////////////////////////////////////////////////

const modelState = require('./model.js')
const util      = require('.././controllers/utility')
const utilState = util.utilState
const storage = utilState.localStorage

module.exports = router => { 
	router.get('/', (req, res) => {
		var isLogged = req.cookies.isLogged
	    isLogged === 'true' ?  res.render('main', {isLogged: true, storage: storage}) : res.redirect('/login')	
	})

  	router.get('/main', (req, res) => {	
  		var isLogged = req.cookies.isLogged	
  		isLogged === 'true' ?  res.render('main', {isLogged: true, storage: storage}) : res.redirect('/login')
	})

	router.get('/signout', (req, res) => {
    	res.redirect('/login')
	})

	router.get('/login', (req, res) => {
    	modelState.login(req, res)
	})

	router.post('/login', (req, res) => {		
		modelState.login(req, res)
	})
}
