(function(window) {
  'use strict';
  function scene(fun) {return new VScene(fun);}

  class VScene {
    constructor(fun) {
      this.function = fun;
      this.objects = {};
    }
    /* {VScene.js} createObject(name, obj), createObject(name, ox, oy)
     * Creates or assignes a object to the scene.
     * name - function to be called.
     * obj - a object
     * ox - origo of the objects x position
     * oy - origo of the objects y position
     * return: the object.
     */
    createObject(name, ox, oy) {this.objects[name] = new VObject(ox, oy); return this.objects[name];}
    /* {VScene.js} run([...p])
     * Run the scene.
     * p - list of arguments.
     * return: the result of the scene.
     */
    run(...p){return this.function(JSON.stringify(p).replace(/[\[\]]/g,""));}
    /* {VScene.js} setGravity(g)
     * Set gravity for the scene.
     * g - the gravity.
     * return: undefined.
     */
    setGravity(g) {try{if(typeof g!="number")throw'𝘷Σ: Gravity can only be a number';this.gravity=g||0;}catch(e) {console.exception(e);}}
  }

  if(typeof(window.VScene) === 'undefined') window.VScene = function(fun) {return scene(fun);}
  if (VScene) console.info("𝘷Σ: VScene loaded");
  else console.error("𝘷Σ: VScene could not be loaded");
}) (window);
