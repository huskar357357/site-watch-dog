////////////////////////////////////////////////
//											  //
// 		This is my utility functions lib.     //
//											  //
////////////////////////////////////////////////

// import libs
const _ = require('lodash')

// get current time
function getTimeBeforeNMinutes(minutes){
    var date = new Date()
    date.setMinutes(date.getMinutes() - minutes)
    return getFormatedDate(date)
}
    
// set '00' style of number smaller than 9
function setFormatDecimal(num) {
    return (num < 10) ? '0' + num : num 
}

// convert gmt to utc
function getFormatedDate(date){
    var f_year      = setFormatDecimal(date.getFullYear())
    var f_month     = setFormatDecimal(date.getMonth() + 1)
    var f_date      = setFormatDecimal(date.getDate())
    var f_hours     = setFormatDecimal(date.getHours())
    var f_minutes   = setFormatDecimal(date.getMinutes())
    var f_seconds   = setFormatDecimal(date.getSeconds())

    return f_year + "-" + f_month + "-" + f_date + " " + f_hours + ":"  + f_minutes + ":" + f_seconds
}

// get values matching given key from given array
function getValuesByKey (arry, key) {
	return _.map(arry, key)
}

function getValuesWithQuoteByKey(arry, key){
    var arry_q = _.map(arry, key)
    var arry_ret = []
    for(var i = 0; i < arry_q.length; i++){
        arry_ret.push("'" + arry_q[i] + "'")
    }
    return arry_ret
}

// Deep diff between two object
function getDiffsBTWDics(object, base) {
    function changes(object, base) {
        return _.transform(object, (result, value, key) => {
            if (!_.isEqual(value, base[key]))
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
        })
    }
    return changes(object, base);
}

// compare 2 dictionaries and return key array
function getKeysWithDiffVals(obj1, obj2) {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)){
            result.push(key)
        }
        else if (_.isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));
    return diff;
} 

// exports const & functions
module.exports.getValuesByKey 			= getValuesByKey
module.exports.getValuesWithQuoteByKey  = getValuesWithQuoteByKey
module.exports.getTimeBeforeNMinutes  	= getTimeBeforeNMinutes
module.exports.getKeysWithDiffVals	    = getKeysWithDiffVals
module.exports.getDiffsBTWDics			= getDiffsBTWDics
module.exports.getFormatedDate          = getFormatedDate