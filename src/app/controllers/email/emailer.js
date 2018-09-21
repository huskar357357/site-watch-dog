////////////////////////////////////////////////
//                                            //
//           This is my own Emailer           //
//                                            //
////////////////////////////////////////////////

var nodemailer = require('nodemailer')
var handlebars = require('handlebars')
var path 	   = require('path')
var fs 		   = require('fs')
var _ 		   = require('lodash')

// sending message to email
function sendEMail(from, to, pwd, replacement)
{
	var readHTMLFile = function(path, callback) {
	    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
	        if (err) {
	            throw err
	            callback(err)
	        }
	        else {
	            callback(null, html)
	        }
	    })
	}
	var transporter = nodemailer.createTransport({
		//service: 'gmail',
		host: "smtp-mail.outlook.com", // hostname
    	secureConnection: false,
		auth: {
			user: from,
			pass: pwd
		},
		tls: {
        	ciphers:'SSLv3'
    	}
	})

	readHTMLFile(__dirname + '/templates/temp.txt', function(err, html) {
	    var template = handlebars.compile(html)
	    var htmlToSend = template({})
	    _.forEach(replacement, function (value, key) {
	        htmlToSend = htmlToSend.replace(key, value)        
	    }) 
	    var mailOptions = {
	        from: from,
	        to : to,
	        subject : 'Alert',
	        html : htmlToSend,
	        attachments: [{
		        filename: 'log.txt',
		        path: path.join(__dirname, '../.././resources/logs/log.txt')
		    }]
	    }
	    transporter.sendMail(mailOptions, function (error, response) {
	        if (error) {
	            console.log(error)
	        }
	    })
	})
}

module.exports.sendEMail = sendEMail