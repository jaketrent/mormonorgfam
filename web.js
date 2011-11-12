var express = require('express');

var app = express.createServer(express.logger());

app.configure(function () {
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

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});