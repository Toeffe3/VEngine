(function(window) {
  'use strict';
  function VEngine() {
    var _VEngine = {};
    var data = {
      scenes: {},
      maxFPS: 30,
      FPSthd: 1,
      FPS: 0,
      frametime: 0,
      frameID: 0,
      unloopID: 0,
      maxframes: 0,
      update: 0,
      loaded: false
    };

  /** {Scene.js} createScene(name,fun)
   * Creates a VScene that can be called with run.
   * name - the name of the VScene.
   * fun - the function to be run when scene is called.
   * return: the value retuened from fun.
   */ _VEngine.createScene = function(name,fun){data.scenes[name]=new VScene(fun);}

  /** {Scene.js} run(functionname, [pram1, ..., pram10])
   * Executes a named VScene with prameters.
   * functionname - The name of VScene.
   * pram1... - array or comma seperated list of arguments up to 10.
   * return: the the value returned frem scene.
   */ _VEngine.run = function(name,p0,p1,p2,p3,p4,p5,p6,p7,p8,p9) {
        try {
          if(!name)throw'𝘷Σ: Specify a function';
          if(!data.scenes[name])throw'𝘷Σ: Function does not exist';
          return data.scenes[name].function(p0,p1,p2,p3,p4,p5,p6,p7,p8,p9);
        } catch(e){console.exception(e);}
      }

  /** {VEnigne.js} framerate([max | within], [threshold])
   * Controle the framerate and check for dropping framerates.
   * max - the maximum FPS.
   * within - change the return.
   * threshold - the amount of frames (>=1) or percentage (<1) the FPS can drop.
   * return: the current fps or if 'within' is true, true if FPS is within tredshold.
   */ _VEngine.framerate = function(fps,thd) {
        if(thd) data.FPSthd=(thd<1?thd:thd/fps);
        if(typeof fps=="number")data.maxFPS=fps;
        if(fps===true)return!data.FPS>(data.maxFPS-(data.maxFPS*data.FPSthd));
        return data.FPS;
      }

  /** {VEnigne.js} loop(function)
   * rerun the function until unloop is called.
   * function - function to be called.
   * return: undefined.
   * DO NOT PARSE ANYTHING TO ARGUMENT b
   */ _VEngine.loop = function(fun,b=null) {
        if(data.loaded) {
          if(typeof fun=="function") {
            data.maxframes=b;data.unloopID=b;b=null;data.update=fun;
          } else {
            if(data.unloopID > 0 && data.frameID >= data.unloopID) return false;
            if(fun>data.frametime+1000/data.maxFPS) {
              data.FPS=1000/(fun-data.frametime);
              data.update();data.frametime=fun;
            }
          }
        } else {
          cancelAnimationFrame(data.frameID);
          data.loaded = true;
          return true;
        }
        data.frameID=requestAnimationFrame(_VEngine.loop.bind(data,b));
        _VEngine.frame = data.frameID;
      }

  /** {Vengien.js} load([function])
   * Load the function after body has loaded and then call loop.
   * function - function to call ONCE before loop and after body.onload
   */ _VEngine.load = function(fun) {
        fun?data.loadf=fun:0;
        if(fun) {
          let f = data.loadf;
          data.loaded = window.onload = function() { f();return true;}
        } else {data.unloopID+=data.maxframes;data.loadf();data.loop();}
      }

   /** {VEnigne.js} unloop()
     * Stops loop function from calling itself until loop is called again.
     * return: undefined
     */ _VEngine.unloop = function() {data.loaded = false}

    console.info("𝘷Σ: Vengien 1.0a by Victor Jacobsen");
    return _VEngine;
  }

  if(typeof(window.VEngine) === 'undefined') window.VEngine = VEngine();
  if (window.VEngine) console.info("𝘷Σ: Fully Initialized");
  else console.error("𝘷Σ: Vengien 1.0a could not load.");
}) (window);
