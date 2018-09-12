var Buyers = require('./model')

module.exports = {
  getRule1: getRule1
}

function getRule1 (req, res, opts, cb) {
  console.log('aaa');
  // Buyers.routeVisitor(visitor, function (err, location) {
  //   if (err) return cb(err)

  //   res.writeHead(302, {Location: location})
  //   res.end()
  // })
}