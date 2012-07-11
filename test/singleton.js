/*global $:true, Backbone:true, _:true, module:true, proxy:true, test:true, equals: true,  ok:true */

var CoolModel = Backbone.Model.extend({});

CoolModel = Backbone.singleton(CoolModel);

var a = new CoolModel({
    id: 4,
    coolFactor: 'LOW'
});

var b = new CoolModel({
    id:4,
    coolFactor: 'HIGH'
});
