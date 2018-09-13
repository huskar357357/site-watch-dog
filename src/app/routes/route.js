const database  = require('.././controllers/database')
const util      = require('.././controllers/utility')

module.exports = app => {
  const mgState   = database.mgState
  const conTenant = database.conState.conTenant  
  const conHere   = database.conState.conHere

  const utilState = util.utilState
  
  const stDate  = '2018-08-01'
  const endDate = '2018-08-31'

  // go to main page
  app.get('/main', (req, res) => {
      database.mgState.excuteQueryAsync(conTenant, "SELECT * FROM bet_log WHERE " + stDate + " <= updated_at", (err, result_tenant) => {
          database.mgState.excuteQueryAsync(conHere, "SELECT * FROM bet_log WHERE " + stDate + " <= updated_at", (err, result_here) => {
              sql = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='tenant_aa' AND `TABLE_NAME`='bet_log'"
              database.mgState.excuteQueryAsync(conTenant, sql, (err, result_column) => {
                  res.render('main/main', {
                      tenant_data: result_tenant,
                      here_data: result_here,
                      column_data: result_column
                  })
              })
          })
      })
  })

  // go to check rule1 page
  app.get('/rule1', (req, res) => {
      mgState.excuteQueryAsync(conTenant, "SELECT * FROM hy WHERE '2018-08-01' <= login_at", (err, result_hy) => {
          var sql_cash = "SELECT SUM(amount) FROM cash_flow WHERE uid = '{}' AND " + stDate + " <= updated_at"
          var sql_bonus =  "SELECT SUM(return_bonus) FROM member_bonus WHERE uid = '{}' AND " + stDate + " <= updated_at"
          mgState.mapTenant(conTenant, sql_cash, utilState.getValuesByKey(result_hy, 'uid'), (err, result_cash) => {
              mgState.mapTenant(conTenant, sql_bonus, utilState.getValuesByKey(result_hy, 'uid'), (err, result_bonus) => {
                  res.render('main/rule1', {
                      hy: result_hy,
                      sum_amnt_cash: result_cash,
                      sum_amnt_bonus: result_bonus
                  });
              });
          });
      })
  }); 

  // go to check rule2 page
  app.get('/rule2', (req, res) => {
      sql = "SELECT amount FROM cash_flow WHERE reference_id = (SELECT id FROM wallet_request WHERE bet_log_id = '{}' AND " + stDate + " <= updated_at) AND action = 'third-party' AND " + stDate + " <= updated_at"
      mgState.excuteQueryAsync(conTenant, "SELECT * FROM bet_log WHERE ((11 <= game_id AND game_id <= 28 AND game_id != 26) OR (66 <= game_id AND game_id <= 80) OR game_id = 34) AND " + stDate + " <= updated_at", (err, result_bet_log) => {
          mgState.mapTenant(conTenant, sql, utilState.getValuesByKey(result_bet_log, 'id'), (err, result_cash_amnt) => {
              res.render('main/rule2', {
                  bet_log: result_bet_log,
                  cash_amnt: result_cash_amnt
              });
          })
      })
  })

  // go to check rule3 page
  // app.get('/rule3', (req, res) => {
  //     sql = "SELECT amount FROM cash_flow WHERE reference_id = (SELECT id FROM wallet_request WHERE bet_log_id = {}) AND action = 'third-party'"
  //     database.mgState.excuteQueryAsync(conTenant, 'SELECT * FROM bet_log WHERE ((11 <= game_id AND game_id <= 28 AND game_id != 26) OR (66 <= game_id AND game_id <= 80) OR game_id = 34) AND '2018-08-01' <= updated_at', (err, result_bet_log) => {
  //         database.mgState.mapTenant(conTenant, sql, utilState.getValuesByKey(result_bet_log, 'id'), (err, result_cash_amnt) => {
  //             res.render('main/rule2', {
  //                 bet_log: result_bet_log,
  //                 cash_amnt: result_cash_amnt
  //             });
  //         });
  //     });
  // }) 
  
};
