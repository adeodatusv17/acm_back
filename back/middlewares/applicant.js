const { Applicant } = require("../db/index.js");

function applicantMiddleware(req, res, next) {
  const uid = req.headers.uid;

  Applicant.findOne({ uid: uid })
    .then(function(value) {
      if (value) {
        return next();
      } else {
        return res.status(401).send("Not an Applicant"); 
      }
    })
    .catch(function(error) {
      console.error(error);
      return res.status(500).send("Internal Server Error"); 
    });
}

module.exports = applicantMiddleware;
