// this is my utility lib

// import lodash library
const _ = require('lodash')

// get values matching given key from given array
function getValuesByKey (arry, key) {
	return _.map(arry, key)
}

// exports const & functions
module.exports.getValuesByKey = getValuesByKey;