const database  = require('.././controllers/database')
const util      = require('.././controllers/utility')

module.exports = app => {
  const mgState   = database.mgState
  const conState  = database.conState  

  const utilState = util.utilState
  
  const stDate  = '2018-08-01'
  const endDate = '2018-08-31'

  // go to main page
  app.get('/main', (req, res) => {
      const conTenant = conState.getDBConnection(conState.db_config_tenant)  
      const conClone  = conState.getDBConnection(conState.db_config_clone)
      mgState.excuteQueryAsync(conTenant, "SELECT * FROM bet_log WHERE " + stDate + " <= updated_at", (err, result_tenant) => {
          mgState.excuteQueryAsync(conClone, "SELECT * FROM bet_log WHERE " + stDate + " <= updated_at", (err, result_clone) => {
              sql = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='tenant_aa' AND `TABLE_NAME`='bet_log'"
              mgState.excuteQueryAsync(conTenant, sql, (err, result_column) => {
                  res.render('main/main', {
                      tenant_data: result_tenant,
                      clone_data: result_clone,
                      column_data: result_column
                  })
              })
          })
      })
  })

  // go to check rule1 page
  app.get('/rule1', (req, res) => {
      const conTenant = conState.getDBConnection(conState.db_config_tenant)  
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
      const conTenant = conState.getDBConnection(conState.db_config_tenant)  
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
  app.get('/rule3', (req, res) => {
      const conTenant = conState.getDBConnection(conState.db_config_tenant)  
      sql = "SELECT amount FROM cash_flow WHERE reference_id = '{}' AND action = 'deductions' AND "  + stDate + " <= updated_at"
      mgState.excuteQueryAsync(conTenant, "SELECT * FROM bet_log WHERE ((11 <= game_id AND game_id <= 28 AND game_id != 26) OR (66 <= game_id AND game_id <= 80) OR game_id = 34) AND " + stDate + " <= updated_at", (err, result_bet_log) => {
          mgState.mapTenant(conTenant, sql, utilState.getValuesByKey(result_bet_log, 'id'), (err, result_cash_amnt) => {
              res.render('main/rule3', {
                  bet_log: result_bet_log,
                  cash_amnt: result_cash_amnt
              });
          });
      });
  }) 
  
};
