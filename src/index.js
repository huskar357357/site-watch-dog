const app = require('./app/controllers/server');
require('./app/routes/route')(app);
const statusStr = require('./app/resources/stats');

// Starting the server
app.listen(app.get('port'), () => {
  console.log(statusStr.state.startedServer, app.get('port'));
});
