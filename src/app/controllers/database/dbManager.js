const map = require('map-async')

// query excutions in for loop
function mapTenant(dbCon, sql, loop_ary, cb) {
    map(loop_ary, function iterator (each_ele, index, callback) {
        var sql_able = sql.replace('{}', each_ele)
        excuteQueryAsync(dbCon, sql_able, callback)
    }, (err, result) => {      
        if (err) return cb(err)   
        cb(err, result)
    })
}

// query excution
function excuteQueryAsync(dbCon, sql, cb) {            
    dbCon.query(sql, (err, result) => {
        if (err) return cb(err)
        cb(err, result)
    })
}

module.exports.excuteQueryAsync = excuteQueryAsync;
module.exports.mapTenant = mapTenant;

