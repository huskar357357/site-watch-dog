const database  = require('.././controllers/database');

module.exports = app => {
  const conTenant = database.conState.conTenant;  
  const conHere   = database.conState.conHere;
  
  // go to main page
  app.get('/main', (req, res) => {
      database.mgState.excuteQueryAsync(conTenant, 'SELECT * FROM bet_log', (err, result_tenant) => {
          database.mgState.excuteQueryAsync(conHere, 'SELECT * FROM bet_log', (err, result_here) => {
              sql = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='tenant_aa' AND `TABLE_NAME`='bet_log'"
              database.mgState.excuteQueryAsync(conTenant, sql, (err, result_column) => {
                  res.render('main/main', {
                      tenant_data: result_tenant,
                      here_data: result_here,
                      column_data: result_column
                  });
              })
          })
      })
  })

  // go to check rule1 page
  app.get('/rule1', (req, res) => {
      database.mgState.excuteQueryAsync(conTenant, 'SELECT * FROM hy', (err, result_hy) => {
          database.mgState.mapTenant(conTenant, result_hy, 0, (err, result_cash) => {
              database.mgState.mapTenant(conTenant, result_hy, 1, (err, result_bonus) => {
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
};
