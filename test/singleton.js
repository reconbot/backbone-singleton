/*global $:true, Backbone:true, _:true, module:true, proxy:true, test:true, equals: true,  ok:true, deepEqual: true */
/*
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

  test("SingletonModel: extend", function() {
    var model = new Backbone.SingletonModel(attrs);
    deepEqual(model.toJSON(), attrs);
  });


  test("SingletonModel: extend", function() {
    var Model = Backbone.SingletonModel.extend({
      initialize: function(atr,opt) {
        deepEqual(this.attributes, attrs, 'attributes are assigned');
        deepEqual(opt, opts, 'options are passed');
      }
    });

    var model = new Model(attrs, opts);
    deepEqual(model.toJSON(), attrs);
  });

  test("SingletonModel: singleton test", function() {
    var SingletonModel = Backbone.SingletonModel;

    var a = new SingletonModel(attrs);
    var b = new SingletonModel(attrs);
    equals(a, b, 'two Models with the same key are the same model');
  });

});
*/