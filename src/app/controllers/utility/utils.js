////////////////////////////////////////////////
//											  //
// 		This is my utility functions lib.     //
//											  //
////////////////////////////////////////////////

// import lodash library
const _ = require('lodash')

// get current time
function getTimeBeforeNMinutes(minutes){
	var date = new Date()
	date.setMinutes(date.getMinutes() - minutes)

	var f_year 		= setFormatDecimal(date.getFullYear())
	var f_month 	= setFormatDecimal(date.getMonth() + 1)
	var f_date 		= setFormatDecimal(date.getDate())
	var f_hours 	= setFormatDecimal(date.getHours())
	var f_minutes 	= setFormatDecimal(date.getMinutes())
	var f_seconds 	= setFormatDecimal(date.getSeconds())

	return f_year + "-" + f_month + "-" + f_date + " " + f_hours + ":"  + f_minutes + ":" + f_seconds
}

function setFormatDecimal(num) {
	return (num < 10) ? '0' + num : num 
}

// get values matching given key from given array
function getValuesByKey (arry, key) {
	return _.map(arry, key)
}

// exports const & functions
module.exports.getValuesByKey 			= getValuesByKey
module.exports.getTimeBeforeNMinutes  	= getTimeBeforeNMinutes