(function(window) {
  'use strict';
  function canvas(c,w,h){return new VCanvas(c,w,h);}

  class VCanvas {
    /* {VCanvas.js} createCanvas(width,hieght,[get])
     * Create new HTML5 canvas
     * width - width of the canvas
     * height - height of the canvas
     * get - returns the DOM-element if true else appends to body automaticly.
     * return: undefined.
     */
    constructor(w,h,get=false){this.px=0;this.py=0;this.canvas=document.createElement("CANVAS");this.resize(w,h);this.ctx=this.canvas.getContext("2d");if(get)return this;document.body.appendChild(this.canvas);}
    /* {VCanvas.js} fill(arr), fill(s,[a]), fill(r,g,b,[a])
     * Set the inner color of ojects.
     * arr - array with 1 to 4 color values.
     * s - saturation between 0 and 255
     * a - alpha/transparency between 0 and 1
     * r,g,b - distinct color values
     * return: undefined.
     */
    fill(r,g,b,a=1) {
      if(typeof r=="object"){g=r[1]||undefined;b=r[2]||undefined;a=r[3]||1;r=r[0]||0;}
      if(g===undefined){g=r;b=r;}if(b===undefined){a=g;g=r;b=r;}
      this.ctx.fillStyle="rgba("+r+","+g+","+b+","+a+")";
    }
    /* {VCanvas.js} stroke(arr), stroke(s,[a]), stroke(r,g,b,[a])
     * Set the stroke color of ojects or lines.
     * arr - array with 1 to 4 color values.
     * s - saturation between 0 and 255
     * a - alpha/transparency between 0 and 1
     * r,g,b - distinct color values
     * return: undefined.
     */
    stroke(r,g,b,a=1){
      if(typeof r=="object"){g=r[1]||undefined;b=r[2]||undefined;a=r[3]||1;r=r[0]||undefined;}
      if(g===undefined){g=r;b=r;}if(b===undefined){a=g;g=r;b=r;}
      this.ctx.strokeStyle="rgba("+r+","+g+","+b+","+a+")";
    }
    /* {VCanvas.js} rotate(deg,[x],[y])
     * Rotate the canvas.
     * deg - amount in degrees.
     * x - x origo.
     * y - y origo.
     * return: undefined.
     */
    rotate(deg=0,x=0,y=0){this.ctx.translate(x,y);this.ctx.rotate(deg*Math.PI/180);this.ctx.translate(-x,-y);}
    /* {VCanvas.js} translate(x,y)
     * translate the canvas origo.
     * x - The new x origo.
     * y - The new y origo.
     * return: undefined.
     */
    translate(x=0,y=0){this.ctx.translate(x,y);}
    /* {VCanvas.js} endshape(deg)
     * Closes the shape.
     * return: undefined.
     */
    endshape() {
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.fillStyle="rgba(0,0,0,0)";
      this.ctx.strokeStyle="rgba(0,0,0,0)";
    }
    /* {VCanvas.js} grid(sx,sy,[arr])
     * Shortcut to draw a grid.
     * sx - distance between horizontal lines.
     * sy - distance between vertical lines.
     * arr - array of 1 to 4 color values.
     * return: undefined.
     */
    grid(sx, sy, color=[255,1]) {
      for (var i = sx; i < this.h; i+=sx) {
        let line = new VLine(0,i,this.w,0);
        this.stroke(color);
        line.drawTo(c2d);
      }
      for (var i = sy; i < this.w; i+=sy) {
        let line = new VLine(i,0,0,this.h,0);
        this.stroke(color);
        line.drawTo(c2d);
      }
    }
    /* {VCanvas.js} lineMove(x,y,w,h)
     * Draw a line with relativly cordinates.
     * x - the x offset.
     * y - the y offset.
     * w - the width the line spans.
     * h - the height the line spans.
     * return: undefined.
     */
    lineMove(x,y,w,h){this.line(w?x:this.px+x,h?y:this.py+y,w?x+w:undefined,h?y+h:undefined);}
    /* {VCanvas.js} line(x,y,[xe],[ye])
     * Set line startpoint (2 arguments) or draw a line between points (4 arguments).
     * x - x offset.
     * y - y offset.
     * xe - x offset end.
     * ye - y offset end.
     * return: undefined.
     */
    line(x,y,xe,ye){xe?this.ctx.beginPath():0;xe?this.ctx.moveTo(x,y):0;this.ctx.lineTo(xe||x,ye||y);this.px=xe||x;this.py=ye||y;}
    /* {VCanvas.js} text(text, x, y, size, font, stroke)
     * text - Text to display
     * x - x cordinate for upper left corner
     * y - y cordinate for upper left corner
     * size - text height in pixels
     * font - font face as text
     * stroke - draw only stroke
     */
    text(text,x=0,y=0,stroke=false,s=30,f="Arial"){this.ctx.font=s+"px "+f;stroke?this.ctx.strokeText(text,x,y):this.ctx.fillText(text,x,y);}
    /* {VCanvas.js} background(arr), background(s,[a]), background(r,g,b,[a])
     * Set the background color without clearing the canvas.
     * arr - array with 1 to 4 color values.
     * s - saturation between 0 and 255
     * a - alpha/transparency between 0 and 1
     * r,g,b - distinct color values
     */
    background(r,g,b,a=1){if(typeof r=="object"){g=r[1]||undefined;b=r[2]||undefined;a=r[3]||1;r=r[0]||0;}if(g!=0&&!g){g=r;b=r;}if(b!=0&&!b){a=g;g=r;b=r;}this.canvas.style.backgroundColor="rgba("+r+","+g+","+b+","+a+")";}
    /* {VCanvas.js} clear([x],[y],[xe],[ye])
     * Clear a area or the whole canvas.
     * x - x offset.
     * y - y offset.
     * xe - x offset end.
     * ye - y offset end.
     * return: undefined.
     * NOTICE: Call at the beginning of cycle, NOT the end
     */
    clear(x,y,xe,ye){this.ctx.save();this.ctx.setTransform(1, 0, 0, 1, 0, 0);this.ctx.clearRect(x||0,y||0,xe||this.w,ye||this.h);this.ctx.restore();}
    /* {VCanvas.js} resize(width,height)
     * Resizes the canvas.
     * width - set the new width.
     * height - set the new height.
     * return: undefined.
     * NOTICE resize will clear the canvas and act the same as clear()
     */
    resize(width,height){this.w=width||window.innerWidth;this.h=height||window.innerHeight;this.canvas.width=this.w;this.canvas.height=this.h;}
  }

if(typeof(window.VCanvas)==='undefined')window.VCanvas=function(c,w,h){return canvas(c,w,h);}
if (VCanvas)console.info("𝘷Σ: VCanvas loaded");
else console.error("𝘷Σ: VCanvas could not be loaded");
})(window);
