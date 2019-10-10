VEngine.framerate(60, 1);

let endScene;
let c2d;
let v1 = VVector(100,100,0,100);
let v2 = VLine(200,100,0,100);
let v3 = v1.copy();

VEngine.load(function() {
  console.log("Run once");
  endScene = VScene(function() {
    console.log("End");
  });
  c2d = VCanvas(c2d);
  c2d.background(0);

  v3.add(v2)
})

VEngine.loop(function() {
  c2d.clear();
  c2d.grid(100,100);

  c2d.stroke(255,0,0);
  v1.drawTo(c2d, 10);

  c2d.stroke(0,255,0,1);
  v2.drawTo(c2d, 10);

  c2d.stroke(255,255,0);
  v3.drawTo(c2d, 10);

  console.log("This has run: "+(VEngine.frame)+" of 100 frames");
  if(VEngine.frame >= 100) {
    endScene.run();
    VEngine.unloop();
  }
});
