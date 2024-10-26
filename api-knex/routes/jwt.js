      
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    // if (token == null) return res.sendStatus(405)
  
    // jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    //   console.log(err)
  
    //   if (err) return res.sendStatus(408)
  
    //   req.user = user
  
    // })
    next()
}
module.exports = authenticateToken
        