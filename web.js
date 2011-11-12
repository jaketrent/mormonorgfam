var express = require('express');

var app = express.createServer(express.logger());

app.configure(function () {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
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

app.get('/', function(req, res) {
  res.render('root.jade');
});

var fam = require('./fam');

app.get('/fam', function (req, res) {
  res.render('fam/index.jade', {
    locals: {
      fam: fam.all
    }
  });
});

app.get('/fam/:id', function (req, res) {
  var person = fam.find(req.params.id);
  res.render('fam/show.jade', {
    locals: {
      person: person
    }
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});