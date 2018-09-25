////////////////////////////////////////////////
//											  //
// 		This is my utility functions lib.     //
//											  //
////////////////////////////////////////////////
const _     = require('lodash')
var fs      = require('fs')
var path    = require('path')
var localStorage


/****************** Local Storage for Server Side **********************/
// init local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage('./scratch')
}

// Init all local storage value 
function initLocalStorage(){
    localStorage.clear()
    localStorage.setItem('cron_int_val1', 30)   // 30 minutes
    localStorage.setItem('cron_int_val2', 1440) // one day
    localStorage.setItem('server_email', "huskar357@outlook.com")
}

/********************* Date & Time *********************/
// get before time from now
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

/******************** Data Structure ******************/
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
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value
        })
    }
    return changes(object, base)
}

// compare 2 dictionaries and return key array
function getKeysWithDiffVals(obj1, obj2) {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)){
            result.push(key)
        }
        else if (_.isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key)
            result.splice(resultKeyIndex, 1)
        }
        return result
    }, Object.keys(obj2))
    return diff
} 

// Mails and Messages Formating
function formatEMail(){
    var check_rule11 = JSON.parse(localStorage.getItem('check_rule11'))
    var check_rule12 = JSON.parse(localStorage.getItem('check_rule12'))
    var check_rule2 = JSON.parse(localStorage.getItem('check_rule2'))    
    var check_rule3 = JSON.parse(localStorage.getItem('check_rule3'))

    var replacement = {
        // body
        '{body11}': 'rule11',
        '{body12}': 'rule12',
        '{body2}': 'rule2',
        '{body3}': 'rule3',
        // uid
        '{uid11}': check_rule11.length > 0 ? check_rule11[0].uid : '-',
        '{uid12}': check_rule12.length > 0 ? check_rule12[0].uid : '-',
        '{uid2}': check_rule2.length > 0 ? check_rule2[0].uid : '-',
        '{uid3}': check_rule3.length > 0 ? check_rule3[0].uid : '-',
        // nickname
        '{nickname11}': check_rule11.length > 0 ? check_rule11[0].nick_name : '-',
        '{nickname12}': check_rule12.length > 0 ? check_rule12[0].nick_name : '-',
        '{nickname2}': check_rule2.length > 0 ? check_rule2[0].nick_name : '-',
        '{nickname3}': check_rule3.length > 0 ? check_rule3[0].nick_name : '-',
        // bet id
        '{id11}': check_rule11.length > 0 ? check_rule11[0].id : '-',
        '{id12}': check_rule12.length > 0 ? check_rule12[0].id : '-',
        '{id2}': check_rule2.length > 0 ? check_rule2[0].id : '-',
        '{id3}': check_rule3.length > 0 ? check_rule3[0].id : '-',
    }
    return replacement
}

function addMessage(message){
    messages = JSON.parse(localStorage.getItem('messages'))
    if (messages === null){
        messages = []
    }
    messages.push(message)    
    var cnt = messages.length
    if(cnt > 5) messages.shift()
    localStorage.setItem('messages', JSON.stringify(messages))
}

function formatLogs(){
    filePath = path.join(__dirname, '../.././resources/logs/log.txt') 
    var alert_post = JSON.parse(localStorage.getItem('post')) 
    var alert_flag = localStorage.getItem('alert_flag') 
    var check_rule11 = JSON.parse(localStorage.getItem('check_rule11'))
    var check_rule12 = JSON.parse(localStorage.getItem('check_rule12'))
    var check_rule2 = JSON.parse(localStorage.getItem('check_rule2'))    
    var check_rule3 = JSON.parse(localStorage.getItem('check_rule3'))
    var logs = "***********************************\n" 
    logs += "* date: [ " + getTimeBeforeNMinutes(0) + " ]\n" 
    logs += "* filename: [ log.txt ]\n"
    logs += "* email: [ " + localStorage.getItem('server_email') + " ]\n"
    logs += "***********************************\n\n" 
    for(var i = 0; i < alert_post.length; i++){
        logs += alert_post[i] + "\n"
    }
    logs += "\n\n"
    if(alert_flag === 'true'){
        logs += "1. Check Result1 (Compare hy money with sum amount of the cash_flow and member_bonus)\n"
        logs += "\t1) Hy Money Amount vs Sum of Cash Flow Amount\n\n"
        logs += "\t\tNo\tuid     \tnickname\t\thy_money\tsum_cash_amount\n"
        for(var i = 0; i < check_rule11.length; i++){
            var nickname = '' + check_rule11[i].nick_name
            var tab_times = 4 - nickname.length / 4
            var nick_tab = ''
            for(var j = 0; j < tab_times; j++) nick_tab += '\t'
            logs += "\t\t" + i + "\t" + check_rule11[i].uid + "\t\t" + check_rule11[i].nick_name + nick_tab + check_rule11[i].hy_money + "\t\t" + check_rule11[i].sum_cash_amnt + "\n"
        }
        logs += "\n\n"
        logs += "\t2) Hy Return Money Amount vs Sum of Member Bonus Amount\n\n"
        logs += "\t\tNo\tuid     \tnickname\t\thy_return_money\tsum_bonus_amount\n"
        for(var i = 0; i < check_rule12.length; i++){
            var nickname = '' + check_rule12[i].nick_name
            var tab_times = 4 - nickname.length / 4
            var nick_tab = ''
            for(var j = 0; j < tab_times; j++) nick_tab += '\t'
            logs += "\t\t" + i + "\t" + check_rule12[i].uid + "\t\t" + check_rule12[i].nick_name + nick_tab + check_rule12[i].hy_return_money + "\t\t" + check_rule12[i].sum_bonus_amnt + "\n"
        }
        logs += "\n"
        logs += "------------------------------------------------------------------------------------------------------\n\n\n"

        logs += "2. Check Result2 (Bet Amount vs Cash Flow Amount (Action: Third-Party)\n\n"
        logs += "\t\tNo\tuid     \tbet_log_id\tnickname\tamount(bet_log)\tamount(cash_flow)\n"
        for(var i =0; i < check_rule2.length; i++){
            var nickname = '' + check_rule2[i].nick_name
            var tab_times = 4 - nickname.length / 4
            var nick_tab = ''
            for(var j = 0; j < tab_times; j++) nick_tab += '\t'
            logs += "\t\t" + i + "\t" + check_rule2[i].uid + "\t\t" + check_rule2[i].bet_log_id + "\t\t" + check_rule2[i].nick_name + nick_tab + check_rule2[i].bet_amount + "\t\t" + check_rule2[i].cash_flow_amount + "\n"
        }
        logs += "\n"
        logs += "------------------------------------------------------------------------------------------------------\n\n\n"

        logs += "3. Check Result3 (Bet Amount vs Cash Flow Amount (Action: Deductions)\n\n"
        logs += "\t\tNo\tuid     \tbet_log_id\tnickname\tamount(bet_log)\tamount(cash_flow)\n"
        for(var i =0; i < check_rule3.length; i++){
            var nickname = '' + check_rule3[i].nick_name
            var tab_times = 4 - nickname.length / 4
            var nick_tab = ''
            for(var j = 0; j < tab_times; j++) nick_tab += '\t'
            logs += "\t\t" + i + "\t" + check_rule3[i].uid + "\t\t" + check_rule3[i].bet_log_id + "\t\t" + check_rule3[i].nick_name + nick_tab + check_rule3[i].bet_amount + "\t\t" + check_rule3[i].cash_flow_amount + "\n"
        }
        logs += "\n"
        logs += "------------------------------------------------------------------------------------------------------\n\n\n"
    }
    logs += "\t\t\t^_^ Plz... ^_^ \n"

    fs.writeFile(filePath, logs, () => {
        console.log("log.txt file is created!")
    })
}

function formatPosts(){
    var alert_post = []
    var alert_flag = localStorage.getItem('alert_flag')    
    if(alert_flag === 'false') {
        alert_post.push('The Site is Safe. Everything is good.')
    }else{
        alert_post.push('We have detected some bad behaviour. It is so dangerous.')
        alert_post.push('We checked all databases and behaviour on 3 ways.')
        alert_post.push('Three checked results are like below tables')
        alert_post.push('There, You can see everything in detail')
    }
    localStorage.setItem('post', JSON.stringify(alert_post))
}

// exports const & functions
module.exports.localStorage             = localStorage

module.exports.getValuesByKey 			= getValuesByKey
module.exports.getValuesWithQuoteByKey  = getValuesWithQuoteByKey
module.exports.getTimeBeforeNMinutes  	= getTimeBeforeNMinutes
module.exports.getKeysWithDiffVals	    = getKeysWithDiffVals
module.exports.getDiffsBTWDics			= getDiffsBTWDics
module.exports.getFormatedDate          = getFormatedDate
module.exports.formatEMail              = formatEMail
module.exports.addMessage               = addMessage
module.exports.formatLogs               = formatLogs
module.exports.initLocalStorage         = initLocalStorage
module.exports.formatPosts              = formatPosts