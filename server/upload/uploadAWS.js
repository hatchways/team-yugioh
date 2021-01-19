require('dotenv').config()

const express = require('express');
const aws = require('aws-sdk')

// app.set() SET assign setting name to value. Certain names can be used to configure the behavior of the server
// app.get() GET gets value of a setting
const app = express();
app.set('views', './views')
app.use(express.static('./public')) // mounts the middleware function
// app.engine('html', require('ejs').renderFile);

app.listen(process.env.PORT || 3000)

const S3_BUCKET = process.env.AWS_BUCKET_NAME

aws.config.region = process.env.AWS_REGION

// create views to return the correct info to user browser when requests are made to variou URLs
app.get('/account', (req, res) => res.render('account.html'));

// view responsible for generating and return signature that client side JS can upload the image with
app.get('sign-s3', (req,res) => {
  const s3 = new aws.S3()
  const fileName = req.query['file-name']
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  // uses S3 module to create a signed URL that the browser can use to make a PUT request to S3
  s3.getSignedUrl('putObject', s3Params, (err,data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData ={
      signedRequest: data, 
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }
    // the URL and signed request are return to the browser in JSON format
    res.write(JSON.stringify(returnData));
    res.end();
  })
})

app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
});