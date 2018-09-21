////////////////////////////////////////////////
//                                            //
//          This is my own Main Model         //
//                                            //
////////////////////////////////////////////////
const _         = require('lodash')

const database  = require('.././controllers/database')
const util      = require('.././controllers/utility')
const sqls 			= require('./queryString.js')

const mgState   = database.mgState
const conState  = database.conState  

const utilState = util.utilState
const storage   = utilState.localStorage

function insTime(sql, st_date){
	return sql.replace('{st_date}', st_date)
}

function cloneData(st_date, cb){
	const conTenant = conState.getDBCon(conState.db_config_tenant)  
  const conClone  = conState.getDBCon(conState.db_config_clone)
  mgState.exQuery(conTenant, insTime(sqls.sql_bet_log, st_date), (err, rslt_tenant) => {  	
  	mgState.exQuery(conClone, sqls.sql_del_bet_log, (err, rslt) => {
  		mgState.mapInsData(conClone, sqls.sql_ins_bet_log, rslt_tenant, (err, rslt) => {
        mgState.exQuery(conTenant, insTime(sqls.sql_hy, st_date), (err, rslt_hy) => {
          mgState.exQuery(conClone, sqls.sql_del_hy, (err, rslt) => {
            mgState.mapInsData(conClone, sqls.sql_ins_hy, rslt_hy, (err, rslt) => {
              mgState.exQuery(conTenant, insTime(sqls.sql_cash_flow, st_date), (err, rslt_cash_flow) => { 
                mgState.exQuery(conClone, sqls.sql_del_cash_flow, (err, rslt) => {
                  mgState.mapInsData(conClone, sqls.sql_ins_cash_flow, rslt_cash_flow, (err, rslt) => {
                    mgState.exQuery(conTenant, insTime(sqls.sql_wallet_request, st_date), (err, rslt_wallet_request) => {
                      mgState.exQuery(conClone, sqls.sql_wallet_request, (err, rslt) => {
                        mgState.mapInsData(conClone, sqls.sql_ins_wallet_request, rslt_wallet_request, (err, rslt) => {
                          mgState.exQuery(conTenant, insTime(sqls.sql_member_bonus, st_date), (err, rslt_member_bonus) => {
                            mgState.exQuery(conClone, sqls.sql_del_member_bonus, (err, rslt) => {
                              mgState.mapInsData(conClone, sqls.sql_ins_member_bonus, rslt_member_bonus, (err, rslt) => {
                                cb()
                              })
                            })
                          }) 
                        })
                      })
                    })
                  }) 
                })      
              })
            })
          })
        })
      }) 
    })      
  })
}

function setData(st_date, cb){
	const conTenant = conState.getDBCon(conState.db_config_tenant)
  const conClone  = conState.getDBCon(conState.db_config_clone)  
	mgState.exQuery(conTenant, insTime(sqls.sql_hy, st_date), (err, rslt_hy) => {	
		mgState.mapQuery(conTenant, insTime(sqls.sql_cash_sum, st_date), _.map(rslt_hy, 'uid'), (err, rslt_cash) => {
			mgState.mapQuery(conTenant, insTime(sqls.sql_bonus_sum, st_date), _.map(rslt_hy, 'uid'), (err, rslt_bonus) => {
				mgState.exQuery(conClone, sqls.sql_del_rule11, (err, rslt) => {
          mgState.mapInsDiffQuery11(conClone, sqls.sql_ins_rule11, rslt_hy, rslt_cash, (err) => {
            mgState.exQuery(conClone, sqls.sql_del_rule12, (err, rslt) => {
    	  			mgState.mapInsDiffQuery12(conClone, sqls.sql_ins_rule12, rslt_hy, rslt_bonus, (err) => {
    	  				mgState.exQuery(conTenant, insTime(sqls.sql_bet_log, st_date), (err, rslt_bet_log) => { 
                  //mgState.mapQuery(conTenant, insTime(sqls.sql_cash_amnt_thirdparty, st_date), _.map(rslt_bet_log, 'id'), (err, rslt_cash_amnt_thirdparty) => { 
                    mgState.mapQuery(conTenant, insTime(sqls.sql_cash_amnt_deductions, st_date), _.map(rslt_bet_log, 'id'), (err, rslt_cash_amnt_deductions) => {
                      //mgState.exQuery(conClone, sqls.sql_del_rule2, (err, rslt) => {
                        //mgState.mapInsDiffQuery23(conClone, sqls.sql_ins_rule2, rslt_bet_log, rslt_cash_amnt_deductions, (err) => {
                          mgState.exQuery(conClone, sqls.sql_del_rule3, (err, rslt) => {
                            mgState.mapInsDiffQuery23(conClone, sqls.sql_ins_rule3, rslt_bet_log, rslt_cash_amnt_deductions, (err) => {
                              cb()
                            })
                          })
                        //})
                      //})
                    }) 
                  //})       
                })
    			  	})
            })
          })
	  		})
			})
		})
	})
}

function getData(st_date, cb){
  const conClone  = conState.getDBCon(conState.db_config_clone)
  mgState.exQuery(conClone, sqls.sql_sel_bet_log, (err, rslt_bet_log) => {
    mgState.exQuery(conClone, sqls.sql_sel_hy, (err, rslt_hy) => {
      mgState.exQuery(conClone, sqls.sql_sel_cash_flow, (err, rslt_cash_flow) => {
        mgState.exQuery(conClone, sqls.sql_sel_wallet_request, (err, rslt_wallet_request) => {
          mgState.exQuery(conClone, sqls.sql_sel_member_bonus, (err, rslt_member_bonus) => {
            mgState.exQuery(conClone, sqls.sql_sel_rule11, (err, rslt_check_rule11) => {
              mgState.exQuery(conClone, sqls.sql_sel_rule12, (err, rslt_check_rule12) => {
                mgState.exQuery(conClone, sqls.sql_sel_rule2, (err, rslt_check_rule2) => {
                  mgState.exQuery(conClone, sqls.sql_sel_rule3, (err, rslt_check_rule3) => {                      
                    alert_flag = (rslt_check_rule11.length > 0) || (rslt_check_rule12 > 0) || (rslt_check_rule2 > 0) || (rslt_check_rule3 > 0) ? true : false
                    storage.setItem('alert_flag', JSON.stringify(alert_flag))
                    storage.setItem('check_rule11', JSON.stringify(rslt_check_rule11))
                    storage.setItem('check_rule12', JSON.stringify(rslt_check_rule12))
                    storage.setItem('check_rule2', JSON.stringify(rslt_check_rule3))
                    storage.setItem('check_rule3', JSON.stringify(rslt_check_rule3))
                    cb()
                  })
                })
              })
            })
          })
        })
      })
    })  
  }) 
}

function login(req, res){
  console.log(req.body)
  if(req.method === 'POST') {
    storage.setItem('email', req.body.email)
    storage.setItem('pwd', req.body.pwd)
    if(req.body.cb === 'on') {      
      storage.setItem('isSaveMode', true)
    }else{
      storage.setItem('isSaveMode', false)
    }
    const conClone  = conState.getDBCon(conState.db_config_clone)
    mgState.exQuery(conClone, sqls.sql_sel_users, (err, rslt) => {
      const user = _.find(rslt, {email: req.body.email, pwd: req.body.pwd})  
      if(_.isEmpty(user)){        
        res.render('pages/login', {isLoginWin: true, storage: storage})
      }else{
        storage.setItem('isLogged', true)
        res.redirect('/main')
      }
    })
  } else {
    storage.setItem('isLogged', false)
    if(storage.getItem('isSaveMode') !== 'true'){
      storage.removeItem('email')
      storage.removeItem('pwd')
    }
    storage.removeItem('isSaveMode')
    res.render('pages/login', {isLoginWin: true, storage: storage})
  }  
}

module.exports.cloneData = cloneData
module.exports.setData   = setData
module.exports.getData   = getData
module.exports.login     = login
