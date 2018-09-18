const sendmail = require('sendmail')()


// sending message to email
function sendEMail(msg, from, to)
{
    sendmail({
        from: from,
        to: to,
        subject: 'detected bad behavior',
        html: msg
    }, (err, reply) => {
        console.log(err && err.stack);
        console.dir(reply);
    });
}

function formatEMail(){
	var msg = ''
	return msg
}

module.exports.sendEMail = sendEMail