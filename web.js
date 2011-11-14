var express = require('express');

var app = express.createServer(express.logger());

app.configure(function () {
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack:true
  }));
});
app.configure('production', function () {
  app.use(express.errorHandler());
});

app.set('views', __dirname + '/views');

var fam = require('./fam');

app.get('/', function(req, res) {
  res.render('index.jade', { layout: 'require' });
});

// ws endpoints

app.get('/ws/fam', function (req, res) {
  res.send(fam.all)
});

app.get('/ws/fam/:id', function (req, res) {
  var person = fam.find(req.params.id);
  res.send(person)
});

app.post('/ws/fam', function (req, res) {

  var request = require('request');
  var jsdom = require('jsdom');
  var url = req.body.url;
  
  request({ uri: url }, function (error, scrapeReq, body) {
    if (error && scrapeReq.statusCode !== 200) {
      console.log('Error getting mormon.org profile: ' + url);
    }
    jsdom.env({
      html: body,
      scripts: [
        'http://code.jquery.com/jquery-1.5.min.js'
      ]
    }, function (err, window) {
      var $ = window.jQuery;
      var newPerson = {
        name: $('#profile-head h1').text(),
        img: 'http://mormon.org' + $('#profile-picture img').attr('src'),
        url: url,
        tagline: $('#profile-head dl div p').text()
      };
      var id = fam.insert(newPerson);
      res.send(newPerson);
    });
  });
});

app.put('/ws/fam/:id', function (req, res) {
  var id = req.params.id;
  fam.set(id, req.body.person);
  return fam.find(id);
});

// views

app.get('/fam', function (req, res) {
  res.render('fam/index.jade', {
    locals: {
      fam: fam.all
    }
  });
});

app.get('/fam/new', function (req, res) {
  res.render('fam/new.jade', {
    locals: {
      person: req.body && req.body.person || fam.new
    }
  });
});

app.post('/fam', function (req, res) {
  var id = fam.insert(req.body.person);
  res.redirect('/fam/' + id);
});

app.get('/fam/:id', function (req, res) {
  var person = fam.find(req.params.id);
  res.render('fam/show.jade', {
    locals: {
      person: person
    }
  });
});

app.get('/fam/:id/edit', function (req, res) {
  var person = fam.find(req.params.id);
  res.render('fam/edit.jade', {
    locals: {
      person: person
    }
  });
});

app.put('/fam/:id', function (req, res) {
  var id = req.params.id;
  fam.set(id, req.body.person);
  res.redirect('/fam/' + id);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});