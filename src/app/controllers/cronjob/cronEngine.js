////////////////////////////////////////////////
//                                            //
//         This is my own CRONE ENGINE        //
//                                            //
////////////////////////////////////////////////

// import libs
const cron 		 = require('node-cron')
const util       = require('.././utility')
const model 	 = require('../.././routes/model.js')
const email 	 = require('.././email')

const utilState  = util.utilState
const storage    = utilState.localStorage
const emailState = email.emailState
const server_em	 = storage.getItem('server_email')
const server_pwd = "ahgiftyswydwjfgpGkd357"

const st_date = '2018-08-01'

// server side cron job1 (every 5 minutes)
function serverCron1() {	
  	//const st_date   = utilState.getTimeBeforeNMinutes(storage.getItem('cron_int_val1'))  	
	cron.schedule('*/30 * * * * *', () => {
		const user_em	 = (storage.getItem('isLogged') === 'true') ? storage.getItem('email') : "antman357357@gmail.com"
		model.cloneData(st_date, (err) => {
	    	model.setData(st_date, (err) => {
	    		model.getData(st_date, ()=> {
	    			console.log(user_em)
	    			emailState.sendEMail(server_em, user_em, server_pwd, {})
	    		})	    		
	    	})
		})
	})
}

// server side cron job2 (every 30 minutes)
function serverCron2() {	
  	//const st_date   = utilState.getTimeBeforeNMinutes(storage.getItem('cron_int_val2'))
	cron.schedule('*/30 * * * *', () => {
		const user_em	 = (storage.getItem('isLogged') === 'true') ? storage.getItem('email') : "antman357357@gmail.com"
		model.cloneData(st_date, (err) => {
	    	model.setData(st_date, (err) => {
	    		model.getData(st_date, () => {
	    			emailState.sendEMail(server_em, user_em, server_pwd, {})
	    		})	    		
	    	})
		})
	})
}

function startServerCron(){
	utilState.initLocalStorage()
	serverCron1()
	serverCron2()
}

module.exports.startServerCron = startServerCron