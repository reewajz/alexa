var express = require('express');
var logger = require('morgan');

var db = require('./db.js');

var SiteRank = require('./models/SiteRank');
var SiteData = require('./models/SiteDetail');
var config = require('./config.json');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
var pagesize = config.Pagesize;

app.post('/siterank', (req, res) => {
  var data = req.body;
  var d1 = new Date();
  var y = d1.getFullYear();
  var m = d1.getMonth() + 1;
  var d = d1.getDate();
  var date = y + '/' + m + '/' + d;

  SiteRank.updateOne(
    { RecordDate: date, URI: data.URI },
    {
      $set: {
        URI: req.body.URI,
        RecordedDate: date,
        RecordDT: date,
        Rank: { Global: req.body.Global, US: req.body.US }
      }
    },
    { upsert: true, runValidators: true }
  )
    .then(result => {
      res.json({ result: true, message: 'Updated' });
    })
    .catch(err => {
      res.json({ result: false, message: err.message });
    });
});

app.get('/siterank/:siteURI/:page', (req, res) => {
  let page = req.params.page || 1;
    SiteRank.find({ URI: req.params.siteURI })
    .skip((pagesize * page) - pagesize)
    .limit(pagesize)
    .then(result => {
      SiteRank.countDocuments({URI: req.params.siteURI}).then(count=>{
        if((count%2)>0||(count/2)==1){
          if((((count/pagesize)+1)>page)){
            res.json({ result: true, data: result });
  
          }else{
            res.json({result:false,message:"it is end of the page"});
          }
        }else{
          if((Math.ceil(count/pagesize)>page)){
            res.json({ result: true, data: result });
  
          }else{
            res.json({result:false,message:"it is end of the page"});
          }
        }
        
      });
    })
    .catch(err => {
      res.json({ result: false, message: err.message });
    });
  
  
});

app.post('/sitedata', (req, res) => {
  var data = req.body;
  SiteData.create(data)
    .then(function(result) {
      res.send({ result: true, message: result });
    })
    .catch(function(err) {
      res.send({ result: false, message: err.message });
    });
});

app.listen(8000, () => {
  console.log('API listening at 8000');
});
