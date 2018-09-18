const modelState = require('./model.js')

module.exports = router => { 
  	router.get('/main', (req, res) => {
    	modelState.cloneData((err) => {
	    	modelState.setData((err) => {
	    		modelState.getData(req, res)
	    	})
  		})
	})

	router.get('/login', (req, res) => {
    	modelState.signOut(req, res)
	})

	router.get('/signup', (req, res) => {
		modelState.signUp(rea, res)
	})
};
