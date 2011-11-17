define(['fam/PersonLineupView', 'fam/Family', 'tmpl!fam/JoinBtn', 'fam/JoinDialogView'], function (PersonLineupView, Family, JoinBtnTmpl, JoinDialogView) {
  return Backbone.View.extend({
    el: '#lineup',
    events: {
      'click .join a': 'showJoin'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'appendPerson', 'showJoin', 'resize');

      this.collection = new Family();
      this.collection.bind('reset', this.render);
      this.collection.bind('add', this.render);
      this.collection.fetch();
    },
    appendPerson: function (person, tile) {
      var personLineupView = new PersonLineupView({
        model: person
      });
      $(this.el).append(personLineupView.render(tile));
    },
    showJoin: function () {
      var joinDialogView = new JoinDialogView({
        collection: this.collection
      });
      $('body').append(joinDialogView.render().el);
    },
    render: function () {
      var self = this;
      $(this.el).html('');

      var po = org.polymaps;

      $(this.el).append(po.svg("svg"));
      var $svg = $(this.el).find("svg");
      $svg.append(po.svg("g"));
      this.$g = $svg.find("g");

      this.map = po.map()
          .container(this.$g[0])
          .tileSize({x: 128, y: 128})
          .angle(.3)
          .add(po.interact())
          .on("resize", this.resize);

      this.resize();

      this.map.add(po.layer(function (tile) {
        _(self.collection.models).each(function (person) {
          self.appendPerson(person, tile);
        });
      }));

      //$(this.el).append(JoinBtnTmpl());

      return this;
    },
    resize: function() {
      if (this.resize.ignore) return;
      var x = $(this.el).width() / 2,
          y = $(this.el).height() / 2;
      this.$g.attr("transform", "translate(" + (x / 2) + "," + (y / 2) + ")");
      this.resize.ignore = true;
      this.map.size({x: x, y: y});
      this.resize.ignore = false;
    }

  });
});