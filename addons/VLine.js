(function(window) {
  'use strict';
  function victor(x,y,dir,len) {return new Victor(x,y,dir,len);}
  function line(x,y,w,h) {return new VLine(x,y,w,h);}

  class Victor {
    constructor(x,y,dir,len){this.x=x;this.y=y;this.angle=dir;this.abs=len||Infinity;this.calc()}
    /* {VLine.js} rotate(deg)
     * Rotate the vector.
     * deg - amount in degrees.
     * return: undefined.
     */
    rotate(deg){this.angle+=deg%(2*Math.PI);this.calc();}
    /* {VLine.js} point(deg)
     * Set the angle to a specific degree.
     * deg - the angle to point at.
     * return: undefined.
     */
    point(deg){this.angle=deg%(2*Math.PI);this.calc();}
    /* {VLine.js} offset(x,y)
     * Move the vector relativly.
     * x - x amount to offset.
     * y - y amount to offset.
     * return: undefined.
     */
    offset(x,y){this.x+=x;this.y+=y;this.calc();}
    /* {VLine.js} translate(x,y)
     * Move the vector to an absolute position.
     * x - x cordinate.
     * y - y cordinate.
     * return: undefined.
     */
    translate(x,y){this.x=x;this.y=y;this.calc();}
    /* {VLine.js} expand(amo)
     * Add or subtract to the vectors length relativly.
     * amo - pixels to expand/subtract to/from the length.
     * return: undefined.
     */
    expand(amo){this.abs+=amo;this.calc()}
    /* {VLine.js} absolute([amo])
     * Set or get the length of the vector.
     * amo - the length in pixels.
     * return: the length.
     */
    absolute(len){if(len!=undefined){this.abs=len;this.calc();}return this.abs}
    /* {VLine.js} calc()
     * Recalculates the properties.
     * return: this.
     */
    calc(){this.xe=this.x+this.abs*Math.cos(this.angle);this.ye=this.y+this.abs*Math.sin(this.angle);if(this.xe==Infinity||!this.xe){this.xe=this.x;}if(this.ye==Infinity||!this.ye){this.ye=this.y;}return this}
    /* {VLine.js} copy()
     * Creates a new instance of this vector with same properties.
     * return: new vector.
     */
    copy(){return new Victor(this.x,this.y,this.angle,this.abs)}
    /* {VLine.js} drawTo(canvas,[arrow])
     * Draw this vector to a canvas with or without a arrow.
     * canvas - the VCanvas to display on.
     * arrow - the size and direction of the arrow.
     * return: undefined.
     */
    drawTo(canvas,arrow=0){
      canvas.ctx.beginPath();
      canvas.line(this.x,this.y,this.xe,this.ye);
      canvas.lineMove(-Math.sin(this.angle+Math.PI/4)*arrow,Math.cos(this.angle+Math.PI/4)*arrow);
      canvas.lineMove(Math.sin(this.angle+Math.PI/4)*arrow,-Math.cos(this.angle+Math.PI/4)*arrow);
      canvas.lineMove(Math.sin(this.angle-Math.PI/4)*arrow,-Math.cos(this.angle-Math.PI/4)*arrow);
      canvas.lineMove(-Math.sin(this.angle-Math.PI/4)*arrow,Math.cos(this.angle-Math.PI/4)*arrow);
      canvas.endshape();
    }
    /* {VLine.js} add(vector)
     * Add a vector or line to this line, resluting in new properties.
     * vector - VVector or VLine.
     * return: undefined.
     */
    add(vector) {
      if(!(vector instanceof Victor))throw vector+" is not a VVector or VLine.";
      let tmp=new Victor(Math.cos(this.angle)*this.abs,Math.sin(this.angle)*this.abs,vector.angle,vector.abs);
      let n=new VLine(this.x,this.y,Math.cos(tmp.angle)*tmp.abs+tmp.x,Math.sin(tmp.angle)*tmp.abs+tmp.y);
      this.translate(n.x,n.y);this.point(n.angle);this.absolute(n.abs);
    }
    /* {VLine.js} static add(vector1, vector2)
     * Add two vectors or lines to together.
     * vector1 - VVector or VLine.
     * vector2 - VVector or VLine.
     * return: A new VVector frome the vector product.
     */
    static add(v1,v2){
      if(!(v1 instanceof Victor))throw"Argument 1 is not a VVector or VLine.";if(!(v2 instanceof Victor))throw"Argument 2 is not a VVector or VLine.";
      let tmp=new Victor(Math.cos(v1.angle)*v1.abs,Math.sin(v1.angle)*v1.abs,v2.angle,v2.abs);
      let n=new VLine(v1.x,v1.y,Math.cos(tmp.angle)*tmp.abs+tmp.x,Math.sin(tmp.angle)*tmp.abs+tmp.y);
      let rtn=v1.copy();rtn.translate(n.x,n.y);rtn.point(n.angle);rtn.absolute(n.abs);return rtn;
    }
  }

  class VLine extends Victor{constructor(x,y,w,h) {
    super(x,y,Math.atan((h)/(w)),Math.sqrt(Math.pow(w,2)+Math.pow(h,2)));}
  }

  if(typeof(window.VVector) === 'undefined') window.VVector = function(x,y,dir,len) {return victor(x,y,dir,len);}
  if(typeof(window.VLine) === 'undefined') window.VLine = function(x,y,w,h) {return line(x,y,w,h);}
  if (Victor && VVector) console.info("𝘷Σ: VLine loaded");
  else console.error("𝘷Σ: VLine could not be loaded");
}) (window);
