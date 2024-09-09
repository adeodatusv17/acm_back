const { Admin }=require("../db/index.js"); 
function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  Admin.findOne({
    username: username,
    password: password
  })
  .then(function(value) {
    if(value) {
      return next();
    }

else {
    return res.status(401).send("Unauthorized");
}
  })
}
module.exports = adminMiddleware;