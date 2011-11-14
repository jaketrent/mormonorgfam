define(['tmpl!fam/JoinDialog', 'fam/Person'], function (JoinDialogTmpl, Person) {
  return Backbone.View.extend({
    className: 'joinDialog',
    events: {
      'click .close': 'closeView',
      'click .go': 'importProfile'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'closeView', 'importProfile', 'importProfileSuccess');
      this.model = new Person();
    },
    closeView: function () {
      this.remove();
    },
    importProfile: function () {
      this.model.save(this.model.attributes, {
        success: this.importProfileSuccess,
        error: function (model, res) {
          alert('failure!');
        }
      }, this);
    },
    importProfileSuccess: function (model, res) {
      this.model = model;
      this.collection.add(this.model);
      alert('success!');
    },
    render: function () {
      $(this.el).html(JoinDialogTmpl());
      Backbone.ModelBinding.bind(this);
      return this;
    }
  });
});