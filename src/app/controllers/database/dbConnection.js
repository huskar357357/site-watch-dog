const mysql     = require('mysql');
const statusStr = require('../.././resources/stats');

var db_config_tenant = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tenant_aa'
};

var db_config_here = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'clone_db'
};

function handleDisconnect() {
    conTenant = mysql.createConnection(db_config_tenant); 
    conHere   = mysql.createConnection(db_config_here); 

    conTenant.connect((err) => {              
        if(err) {                                     
            console.log(db_config_tenant.host, db_config_tenant.database, statusStr.state.connectionErr);
            setTimeout(handleDisconnect, 2000); 
        }                                     
    });   

    conHere.connect((err) => {              
        if(err) {                                     
            console.log(db_config_here.host, db_config_here.database, statusStr.state.connectionErr);
            setTimeout(handleDisconnect, 2000); 
        }                                     
    });                                  

    conTenant.on('error', (err) => {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleDisconnect();                         
        } else {                                      
            throw err;                                  
        }
    });

    conHere.on('error', (err) => {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleDisconnect();                         
        } else {                                      
            throw err;                                  
        }
    });

    module.exports.conTenant = conTenant;
    module.exports.conHere = conHere;
}

handleDisconnect();