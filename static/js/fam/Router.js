define(['fam/LineupView'], function (LineupView) {
  return Backbone.Router.extend({
    routes: {
      '': 'lineup'
    },
    lineup: function () {
      var lineupView = new LineupView();
      lineupView.render().el;
    }
  });
});