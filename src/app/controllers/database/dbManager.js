const map          = require('map-async')

function mapTenant(dbCon, hy_tenant, mode, cb) {
    map(hy_tenant, function iterator (each_hy_tenant, index, callback) {
        var sql_cash = "SELECT SUM(amount) FROM cash_flow WHERE uid = '" + each_hy_tenant.uid + "'"
        var sql_bonus =  "SELECT SUM(return_bonus) FROM member_bonus WHERE uid = '" + each_hy_tenant.uid + "'"

        sql = (mode == 0) ? sql_cash : sql_bonus
        excuteQueryAsync(dbCon, sql, callback)
    }, (err, result) => {
        if (err) return cb(err)
        cb(err, result)
    })
}

function excuteQueryAsync(dbCon, sql, cb) {            
    dbCon.query(sql, (err, result) => {
        if (err) return cb(err)
        cb(err, result)
    })
}

module.exports.excuteQueryAsync = excuteQueryAsync;
module.exports.mapTenant = mapTenant;

