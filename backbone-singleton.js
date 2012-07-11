/*global $:true, Backbone:true, _:true */

Backbone.singleton = function(Model, opt){
  opt = opt || {};

  var hash = opt.hash || Model.hash || function(attr, modelOpt){
      var idAttribute = Model.prototype.idAttribute;
      return attr && attr[idAttribute];
    };

  var hashFail = opt.hashFail || Model.hashFail || function(attr, modelOpt){
      return new Model(attr, modelOpt);
    };

  var SingletonModel = function(attr, modelOpt){
    var key = hash(attr, modelOpt);

    if(!key){
      return hashFail(attr, modelOpt);
    }

    if(this.store[key]){
      this.store[key].set(attr, modelOpt);
    }else{
      this.store[key] = new Model(attr, modelOpt);
    }

    return this.store[key];
  };

  var F = function(){};
  F.prototype = Model;
  SingletonModel.prototype = new F();
  _.extend(SingletonModel, Model);

  SingletonModel.prototype.store = {};
  
  return SingletonModel;
};

