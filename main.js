VEngine.framerate(60, 1);

VEngine.load(function() {
  console.log("Run once");
})

VEngine.loop(function() {
  console.log("This has run: "+(VEngine.frame-1)+" of 100");
  if(VEngine.frame-1 >= 100) VEngine.unloop();
});
