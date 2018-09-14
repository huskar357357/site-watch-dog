const mysql     = require('mysql')
const statusStr = require('../.././resources/stats')

// server side connection
var db_config_tenant = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'tenant_aa'
};

// here connection
var db_config_clone = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'clone_db'
};

function getDBConnection(config) {
    const con = mysql.createConnection(db_config_clone)
    con.on('error', (err) => {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            getDBConnection()                         
        } else {                                      
            throw err                                  
        }
    }) 
    return con   
}

module.exports.db_config_tenant = db_config_tenant
module.exports.db_config_clone  = db_config_clone
module.exports.getDBConnection  = getDBConnection