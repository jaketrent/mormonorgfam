define(['fam/IndexView'], function (IndexView) {
  return Backbone.Router.extend({
    routes: {
      '': 'index'
    },
    index: function () {
      var indexView = new IndexView();
      indexView.render().el;
    }
  });
});