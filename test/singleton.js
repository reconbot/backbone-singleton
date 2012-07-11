/*global $:true, Backbone:true, _:true, module:true, proxy:true, test:true, equal: true,  ok:true, deepEqual: true, notEqual: true*/

$(document).ready(function() {

  module("Backbone.SingletonModel");

  var lastRequest;
  Backbone.sync = function() {
    lastRequest = _.toArray(arguments);
  };

  var attrs = {
    id     : '1-the-tempest',
    title  : "The Tempest",
    author : "Bill Shakespeare",
    length : 123
  };

  var opts = {
    stuff: 2
  };

  test("SingletonModel: init", function() {
    var model = new Backbone.SingletonModel(attrs);
    deepEqual(model.attributes, attrs, 'initialize a new model');
  });


  test("SingletonModel: extend", function() {
    var Model = Backbone.SingletonModel.extend({
      initialize: function(atr,opt) {
        deepEqual(this.attributes, attrs, 'attributes are assigned');
        deepEqual(opt, opts, 'options are passed');
      }
    });

    var model = new Model(attrs, opts);
    deepEqual(model.attributes, attrs, 'attributes are retrievable');
  });

  test("SingletonModel: singleton test", function() {
    var SingletonModel = Backbone.SingletonModel;

    var a = new SingletonModel(attrs);
    var b = new SingletonModel(attrs);
    equal(a, b, 'two Models with the same key are the same model');
  });

  test("SingletonModel: subclass stores", function() {
    var SingletonModel = Backbone.SingletonModel;
    var CoolModel = SingletonModel.extend({});

    var a = new SingletonModel(attrs);
    var b = new CoolModel(attrs);
    notEqual(a, b, "subclasses dont share models");
    notEqual(a._singleton.store, b._singleton.store, "subclasses don't share stores");
  });

});
