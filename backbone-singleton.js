var makeStoreable = function(model){
  var StoreModel = function(attr, opt){
    if(!attr || !attr.id){
      // The behavior you exhibit here is up to you
      throw new Error('Cool Models always have IDs!');
    }
    if(this.store[attr.id]){
      this.store[attr.id].set(attr, opt);
    }else{
      var newModel = new model(attr, opt);
      this.store[attr.id] = newModel;
    }
    return this.store[attr.id];
  };
  StoreModel.prototype.store = {};
  return StoreModel;
};

var CoolModel = Backbone.Model.extend({});

CoolModel = makeStoreable(CoolModel);

var a = new CoolModel({
    id: 4,
    coolFactor: 'LOW'
});

var b = new CoolModel({
    id:4,
    coolFactor: 'HIGH'
});

console.log(a===b); //true!
console.log(a.get('coolFactor') === 'HIGH'); //true!
