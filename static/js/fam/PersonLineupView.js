define(['tmpl!fam/PersonLineupView', 'fam/PersonDetailView'], function (PersonLineupViewTmpl, PersonDetailView) {
  return Backbone.View.extend({
    tagName: 'li',
    events: {
      'click .more': 'showDetail'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'showDetail');
    },
    showDetail: function () {
      var personDetailView = new PersonDetailView({
        model: this.model
      });
      $('body').append(personDetailView.render().el);
    },
    render: function (tile) {

      var po = org.polymaps;

      var g = tile.element = po.svg("g");

      var link = g.appendChild(po.svg("a"));
      link.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.model.get('img') + '?imgmax=700');

      var image = link.appendChild(po.svg("image"));
      image.setAttribute("preserveAspectRatio", "none");
      image.setAttribute("x", 0);
      image.setAttribute("y", 0);
      image.setAttribute("width", 128);
      image.setAttribute("height", 128);
      image.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.model.get('img'));

      //$(this.el).html(PersonLineupViewTmpl(this.model.toJSON()));
      return this;
    }
  });
});