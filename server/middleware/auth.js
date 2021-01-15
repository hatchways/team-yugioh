const nJwt = require("njwt");

//ensures that user has been authenticated by google
const auth = async (req, res, next) => {
  const authorization = req.header("Authorization").split(" ");
  const jwtToken=authorization[1];

  nJwt.verify(jwtToken,process.env.JWT_SECRET,function(err,verifiedJwt){
    if(err){
      console.log(err); // Token has expired, has been tampered with, etc
      res.status(401).send('')
    }else{
      console.log(verifiedJwt); // Will contain the header and body
      next()
    }
  });

  
};

module.exports = auth;
