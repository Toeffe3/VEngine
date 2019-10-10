(function(window) {
  'use strict';
  function scene(fun) {
    return new VScene(fun);
  }

  class VScene {
    constructor(fun) {
      this.function = fun;
      this.objects = {};
    }

    createObject(name, p) {
      this.objects[name] = new VObject(p);
      return this.objects[name];
    }

    run(...p){return this.function(JSON.stringify(p).replace(/[\[\]]/g,""));}

    setGravity(g) {
      try {
        if(typeof g!="number") throw '𝘷Σ: Gravity can only be a number'
        this.gravity = g||0;
      } catch (e) { console.exception(e); }
    }
  }

  if(typeof(window.VScene) === 'undefined') window.VScene = function(fun) {
    return scene(fun);
  }
  if (VScene) console.info("𝘷Σ: VScene loaded");
  else console.error("𝘷Σ: VScene could not be loaded");
}) (window);
