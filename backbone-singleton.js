/*global $:true, Backbone:true, _:true */

(function(){
  var SingletonModel = function(){
    Backbone.Model.apply(this, arguments);
    return this.capture();
  };

  SingletonModel.prototype = Backbone.Model.prototype;

  SingletonModel.prototype._singleton = {
    store: {},
    counts: {}
  };

  SingletonModel.prototype.hash = function(){
    return this.id;
  };

  SingletonModel.prototype.capture = function(){
    var meta = this._singleton;
    
    var hash = this.hash();
    if(!hash){
      this.singleton = false;
      return;
    }
    
    var model = meta.store[hash];
    if(model){
      meta.counts[hash] ++;
      model.set(this.attributes);
      return model;
    }

    meta.store[hash] = this;
    meta.counts[hash] = 1;
    this.singleton = true;
    return this;
  };

  SingletonModel.prototype.release = function(){
    if(!this.singleton){return;}
    var meta = this._singleton;
    var hash = this.hash();
    meta.counts[hash] --;
  };


  //Class methods
  _.extend(SingletonModel, Backbone.Model);

  SingletonModel.extend = function(){
    var child = Backbone.Model.extend.apply(this, arguments);
    child.prototype._singleton = {
      store:{},
      counts:{}
    };
    return child;
  };

  SingletonModel.reap = function(){
    //delete all models with counts === 0;
    var meta = this.prototype._singleton;
    _.forEach(meta.counts,function(count, hash){
      if(count < 1){
        delete meta.store[hash];
        delete meta.counts[hash];
      }
    });
  };


  Backbone.SingletonModel = SingletonModel;
  
}());

