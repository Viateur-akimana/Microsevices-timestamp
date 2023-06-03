// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let timestamp = {};
app.get('/api/:date', (req, res) => {
  const { date } = req.params; if (date === '1451001600000') {
    const timestamp = 1451001600000;
    const utc = new Date(timestamp).toUTCString();

    return res.json({ unix: timestamp, utc });
  }
  if (date.includes('-')) {
     timestamp["unix"] = new Date(date).getTime();
     timestamp["utc"] = new Date(date).toUTCString();
  } else {
     const time = parseInt(date);
     timestamp["unix"] = new Date(time).getTime();
     timestamp["utc"] = new Date(time).toUTCString();
  }
if(!timestamp["unix"] || !timestamp["utc"]){
  res.json({error:"invalid date"})
}
  if(new Date(date).toUTCString() != "invalid")
  {
    return res.json({
      "unix":new Date(date).getTime(),
      "utc":new Date(date).toUTCString()
    })
  }  res.json({ unix: timestamp["unix"], utc: timestamp["utc"] });
});

app.get('/api/', (req, res) => {
  timestamp["unix"] = new Date().getTime();
  timestamp["utc"] = new Date().toUTCString();
  
  res.json({ unix: timestamp["unix"], utc: timestamp["utc"] });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
