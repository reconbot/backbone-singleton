# Backbone Singleton
Backbone singleton can be used to keep a cache of all your models. If new models are created that are the same as your existing models you'll get a reference to your origional model and it's data will be updated. This allows for some cool patterns but comes with few caveats with long lived pages as your models will never be garbage collected without some intervention.

Backbone singleton is tested with backbone's own model tests. It passes. It is also tested with a small suite of tests to ensure the singleton pattern. It passes that too.

## To use me - just extend me
###### (not required but it's recommended)
```
  var CoolModel = Backbone.SingletonModel.extend({});
  var a = new CoolModel({id: 4, coolLevel: "low"});
  var b = new CoolModel({id: 4, coolLevel: "MAX"});
  console.log(a === b); // true!
  console.log(a.get('coolLevel')); // "MAX"
```

## Inspiration
- http://backstage.soundcloud.com/2012/06/building-the-next-soundcloud/
- http://stackoverflow.com/questions/11145159/implement-javascript-instance-store-by-returning-existing-instance-from

## API

### We define three instance methods

- model.capture()
    - Submits a free model to the model store
    - Updates a model that's already in the store (why would you do this?)
    - Increments the stores reference count of the model

- model.release()
    - Used to tell the store you're done with the model
    - Decrements the stores reference count of the model
- model.hash()
    - Returns the id
    - Respects the idAttribute
    - Should be unique per Model class
    - Can be overidden if you need more specificality than the id of the model

### We have two static/class methods
- Backbone.SingletonModel.extend()
    - Does what you think it should
    - It is patched to give each subclass its own singleton store
- Backbone.SingletonModel.reap()
    - Deletes all models who's referece count is below 1

### We have two properties
- model.singleton - Boolean()
    - True if the model is in the store
    - False if not - this happens when hash() returns undef (eg, no id)
- model._singleton - {store:{}, count:{}}
    - A reference to the store that's on the Constructor object.
    - Cool to look at


##TODO:
- Test custom Hash's
