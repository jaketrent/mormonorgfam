require({
  paths: {
    "order": "/js/order",
    "text": "/js/text",
    "tmpl": "/js/tmpl",
    "webstack": "/js/webstack",
    "jquery": "/js/vendor/jquery",
    "underscore": "/js/vendor/underscore",
    "backbone": "/js/vendor/backbone",
    "handlebars": "/js/vendor/handlebars.1.0.0.beta.3"
  }
}, ['require', 'webstack'], function (require) {
  require(['fam/Router'], function (Router) {
    new Router();
    Backbone.history.start();
  });
});