////////////////////////////////////////////////
//                                            //
//         This is my own DB Manager          //
//                                            //
////////////////////////////////////////////////

const map  = require('map-async')
const _    = require('lodash')
const util = require('../utility')

// query excution
function exQuery(dbCon, sql, cb) {         
    dbCon.query(sql, (err, result) => {
        if (err) return cb(err)
        cb(err, result)
    })
}

//query excutions in for loop
function mapQuery(dbCon, sql, loop_ary, cb) {
    map(loop_ary, function iterator (each_ele, index, callback) {
        exQuery(dbCon, sql.replace('{id}', each_ele).replace('{uid}', each_ele), callback)
    }, (err, result) => {      
        if (err) return cb(err)   
        cb(err, result)
    })
}

// insert map data in to the given table
function mapInsData(dbCon, sql, arry, cb) {
    var cnt_1 = 0
    _.forEach(arry, function (value_ary, key) {
        var cnt_2 = 0
        sql += cnt_1 === 0 ? '(' : ', ('
        _.forEach(value_ary, (value) => {
            sql += cnt_2 === 0 ? '' : ','
            sql += handleException(value)
            cnt_2 ++            
        })
        sql += ')\n'   
        cnt_1 ++ 
    })   
    exQuery(dbCon, sql, (err, result) => {      
        if (err) return cb(err)   
        cb(err, result)
    })
}

// exception handle (intval, null, date)
function handleException(value){
    return _.isDate(value) ? `'${util.utilState.getFormatedDate(value)}'` : ((value !== null) ? (Number.isInteger(value) ? `${value}` : `'${value}'`) : null)
}

// insert record with not matching each other  ----- for rule11
function mapInsDiffQuery11(dbCon, sql, arry1, arry2, cb) { 
    var cnt = 0       
    for (var i = 0; i < arry1.length; i++) {
        for(var key in arry2[i][0]){
            if(arry2[i][0][key])                     
                sum_amnt = arry2[i][0][key]
            else sum_amnt = 0
        }
        if(arry1[i].money != sum_amnt) {
            if(cnt === 0)
                sql += `('${arry1[i].uid}', '${arry1[i].money}', '${sum_amnt}', '${arry1[i].nickname}')`
            else
                sql += `, ('${arry1[i].uid}', '${arry1[i].money}', '${sum_amnt}', '${arry1[i].nickname}')`
            cnt++
        }
    }
    exQuery(dbCon, sql, (err, result) => {      
        if (err) return cb(err)   
        cb(err, result)
    })
}

// insert record with not matching each other  ----- for rule12
function mapInsDiffQuery12(dbCon, sql, arry1, arry2, cb) {
    var cnt = 0       
    for (var i = 0; i < arry1.length; i++) {
        for(var key in arry2[i][0]){
            if(arry2[i][0][key])                     
                sum_amnt = arry2[i][0][key]
            else sum_amnt = 0
        }
        if(arry1[i].return_money != sum_amnt) {
            if(cnt === 0)
                sql += `('${arry1[i].uid}', '${arry1[i].return_money}', '${sum_amnt}', '${arry1[i].nickname}')`
            else
                sql += `, ('${arry1[i].uid}', '${arry1[i].return_money}', '${sum_amnt}', '${arry1[i].nickname}')`
            cnt++
        }
    }
    exQuery(dbCon, sql, (err, result) => {      
        if (err) return cb(err)   
        cb(err, result)
    })
}

// insert record with not matching each other  ----- for rule2, 3
function mapInsDiffQuery23(dbCon, sql, arry1, arry2, cb) {
    var cnt = 0       
    for (var i = 0; i < arry1.length; i++) {
        for(var key in arry2[i][0]){
            if(arry2[i][0][key])                     
                sum_amnt = arry2[i][0][key]
            else sum_amnt = 0
        }
        if(arry1[i].amount != sum_amnt) {
            if(cnt === 0)
                sql += `('${arry1[i].id}', '${arry1[i].uid}', '${arry1[i].bet_amount}', '${sum_amnt}', '${arry1[i].nickname}')`
            else
                sql += `, ('${arry1[i].id}', '${arry1[i].uid}', '${arry1[i].bet_amount}', '${sum_amnt}', '${arry1[i].nickname}')`
            cnt++
        }
    }
    exQuery(dbCon, sql, (err, result) => {      
        if (err) return cb(err)   
        cb(err, result)
    })
}

module.exports.exQuery = exQuery
module.exports.mapQuery = mapQuery
module.exports.mapInsDiffQuery11 = mapInsDiffQuery11
module.exports.mapInsDiffQuery12 = mapInsDiffQuery12
module.exports.mapInsDiffQuery23 = mapInsDiffQuery23
module.exports.mapInsData = mapInsData