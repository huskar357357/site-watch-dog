const database  = require('.././controllers/database')
const util      = require('.././controllers/utility')
const sqls 			= require('./queryString.js')
const _         = require('lodash')

const mgState   = database.mgState
const conState  = database.conState  

const utilState = util.utilState
const st_date  	= '2018-08-01'

function insTime(sql, st_date, end_date){
	return sql.replace('{st_date}', st_date)
}


function cloneData(cb){
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

function setData(cb){
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

function getData(req, res){
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
                    alert_flag = true
                    res.render('main', {
                      // bet_log: rslt_bet_log,
                      // hy: rslt_hy,
                      // cash_flow: rslt_cash_flow,
                      // wallet_request: rslt_wallet_request,
                      // member_bonus: rslt_member_bonus,
                      check_rule11: rslt_check_rule11,
                      check_rule12: rslt_check_rule12,
                      check_rule2: rslt_check_rule3,
                      check_rule3: rslt_check_rule3,
                      alert_flag: alert_flag
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

function login(req, res){
  email = 'antman357357@gmail.com'
  isLogined = true
  isLogined ? res.render('main', {email: email}) : res.render('login', {isLoginWin: true})
}

function signUp(req, res){
  alert("success fully signed", (err) => {
    res.render('pages/login', {isLoginWin: true})
  })  
}

function signOut(req, res){
  res.render('pages/login', {isLoginWin: true})
}

module.exports.cloneData = cloneData
module.exports.setData   = setData
module.exports.getData   = getData
module.exports.signUp    = signUp
module.exports.login     = login
module.exports.signOut   = signOut
