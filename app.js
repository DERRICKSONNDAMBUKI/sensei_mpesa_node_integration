const express = require("express");
const request = require("request");

const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Hello sensei");
});

const access = (req, res, next) => {
  // access token
  let url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  let auth = new Buffer.from(
    "customer key:customer secret" // yours
  ).toString("base64");

  request(
    {
      url: url,
      headers: {
        Authorization: "Basic " + auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        req.access_token = JSON.parse(body).access_token;
        next();
      }
    }
  );
};

app.get("/register", access, (req, res) => {
  let url = "";
  let auth = "Bearer " + req.access_token;
  request(
    {
      url: "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl",
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        ShortCode: "174379",
        ResponseType: "Completed",
        ConfirmationURL: "http://192.168.22.47:8000/confirmation",
        ValidationURL: "http://192.168.22.47:8000/validation_url",
      },
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
      }
      res.status(200).json(body);
    }
  );
});

app.post('/confirmation',(req,res)=>{
  console.log('..........confirmation..........');
  console.log(req.body);
})

app.post('/validation',(req,res)=>{
  console.log('..........validation..........');
  console.log(req.body);
})

app.get('/simulate',(req,res)=>{
  let url = ''
  let auth = 'Bearer'+req.access_token

  request(
    {
      url:url,
      method:'POST',
      headers:{
        'Authoriazation':auth
      },
      json:{
        "ShortCode": 600996,
        "ResponseType": "Completed",
        "ConfirmationURL": "https://192.168.22.47:8000/confirmation",
        "ValidationURL": "https://192.168.22.47:8000/validation",
      }
    },
    function (error,response,body) {
      if (error) {
        console.error(error);
      } else {
        res.status(200).json(body)
      }
      
    }
  )
})



app.get("/access_token", access, (req, res) => {
  res.status(200).json({ access_token: req.access_token });
});

// listen
app.listen(8000, (err, live) => {
  if (err) {
    console.error(err);
  }

  console.log("Server running at http://0.0.0.0:8000");
});
