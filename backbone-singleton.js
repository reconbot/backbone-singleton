/*global Backbone:true, _:true */

(function(Backbone){

  var Model = Backbone.Model;

  var SingletonModel = function(){
    // bad form! why are we ALWAYS creating a model?
    Model.apply(this, arguments);
    return this.capture();
  };

  SingletonModel.prototype = Model.prototype;

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
    if(typeof hash === 'undefined'){
      this.singleton = false;
      return;
    }
    
    var model = meta.store[hash];
    if(model === this){
      return this;
    }

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
  _.extend(SingletonModel, Model);

  SingletonModel.extend = function(){
    var child = Model.extend.apply(this, arguments);
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

}(Backbone));

