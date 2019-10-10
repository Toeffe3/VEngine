VEngine.framerate(60, 1);

let endScene;

VEngine.load(function() {
  console.log("Run once");
  endScene = VScene(function() {
    console.log("End");
  });
})

VEngine.loop(function() {
  console.log("This has run: "+(VEngine.frame-1)+" of 100");
  if(VEngine.frame-1 >= 100) {
    endScene.run();
    VEngine.unloop();
  }
});
