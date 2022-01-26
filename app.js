const express = require("express");
const request = require("request");

const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Hello sensei");
});

app.get("/access_token",access, (req, res) => {
 
  res.status(200).json({access_token})
});

const access =(req,res,next)=>{
  let url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
let auth = new Buffer.from(
  "CH7CjKtxwa62bqk4AMmAFPMW17rsPT9e:zgzZMnK1KD3VtuPB"
).toString("base64");

request(
  {
    url: url,
    headers: {
      'Authorization' : 'Basic '+auth
    //   Authorization:
    //     `Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ== CH7CjKtxwa62bqk4AMmAFPMW17rsPT9e:zgzZMnK1KD3VtuPB`,
    },
  },
  (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(body);
    }
  }
);

}

// listen
app.listen(8000, (err, live) => {
  if (err) {
    console.error(err);
  }

  console.log("Server running at http://0.0.0.0:8000");
});
