(function(window) {
  'use strict';
  function object(cx,cy){return new VObject(cx,cy);}
  function simpel(){return new SimpelObject();}
  function point(x,y){return new VPoint(x,y);}

  class VObject {
  /* {VObject.js} VObject(x,y)
   * Add the starting point of the object.
   * x - x position of the object.
   * y - y position of the object.
   * return: undefined
   */
    constructor(cx=0,cy=0){this.cx=cx;this.cy=cy;this.points=[];}
  /* {VLine.js} addPoint(x,y)
   * Add a absolute point to the object.
   * x - x position of the point.
   * y - y position of the point.
   * return: undefined
   */
    addPoint(x,y){this.points.push(new VLine(this.cx,this.cy,x,y));}
  /* {VObject.js} rotate(rad)
   * Rotate the object relativy to its current rotation.
   * rad - rotation amount in radians.
   * return: undefined
   */
    rotate(rad){for(let point of this.points)point.rotate(rad)%(2*Math.PI);}
  /* {VObject.js} translate(x,y)
   * Move the object to a absolute position.
   * x - The new x position of the object
   * y - The new y position of the object
   * return: undefined
   */
    translate(x,y){for(let point of this.points)point.translate(x,y);}
  /* {VCanvas.js} drawTo(canvas)
   * Display the object on a canvas.
   * canvas - the canvas to display the object on.
   * return: undefined
   */
    drawTo(canvas){
      canvas.ctx.beginPath();
      canvas.line(this.cx,this.cy,this.points[0].x,this.points[0].y);
      for(let point of this.points)canvas.line(point.xe,point.ye);
      canvas.line(this.cx,this.cy);
      canvas.endshape();
    }
  /* {VObject.js} simpel(object)
   * Convert VObject to a object of points, not vectors.
   * object - the VObject to convert.
   * return: SimpleObject or null if no VObject is parsed
   */
    static simpel(object){
      if(object instanceof VObject){
        let so = new SimpelObject();
        so.point(object.cx,object.cy);
        for(let a of object.points)so.point(a.xe,a.ye);
        return so;
      } return null;
    }
  /* {VObject.js} simpel()
   * Convert VObject to a object of points, not vectors.
   * object - the VObject to convert.
   * return: SimpleObject or null if no VObject is parsed
   */
    simpel(){return VObject.simpel(this);}
  }
  class SimpelObject {
    constructor(){this.points=[];}
  /* {VObject.js} point(x, [y])
   * Add point to object
   * x - x cordinate of point.
   * y - y cordinate of point.
   * return: undefined
   */
    point(x,y){this.points.push([x,y==undefined?x:y]);}
  }
  class VPoint {
    constructor(x,y){this.x=x;this.y=y;}
  /* {VObject.js} translate(x, [y])
   * Move the point to a absolute position.
   * x - x cordinate of point.
   * y - y cordinate of point.
   * return: undefined
   */
    translate(x,y){this.x=x;this.y=y==undefined?x:y;}
  /* {VObject.js} offset(x, [y])
   * Move the point relativly
   * x - The amount to move in the x direction.
   * y - The amount to move in the y direction.
   * return: undefined
   */
    offset(x,y){this.x+=x;this.y+=y;}
  /* {VObject.js} copy()
   * Copy the point.
   * return: VPoint
   */
    copy(){return new VPoint(this.x,this.y);}
  /* {VObject.js} victor(p)
   * Create a vector from this and another VPoint.
   * p - A VPoint.
   * return: VVector
   */
    victor(p){return new VLine(this.x,this.y,p.x,p.y);}
  /* {VObject.js} victor(p1, p2)
   * Create a vector from 2 VPoints.
   * p1 - A VPoint.
   * p2 - A VPoint.
   * return: VVector
   */
    static victor(p1,p2){return new VLine(this.x,this.y,p.x,p.y);}
  /* {VLine.js} distance(p1, p2)
   * Find the distance between two points.
   * p1 - x cordinate of point.
   * p2 - y cordinate of point.
   * return: The distance between two VPoints
   */
    static distance(p1,p2){return new VLine(p1.x,p1.y,p2.x,p2.y).absolute();}
    /* {VLine.js} distance(p)
    * Find the distance between this an a VPoint.
    * p - x cordinate of point.
    * return: The distance between the two VPoints
    */
    distance(p){return new VLine(this.x,this.y,p.x,p.y).absolute();}
  }

  if(typeof(window.VObject)==='undefined')window.VObject=function(cx,cy){if(cx===undefined)return VObject;else return object(cx,cy);}
  if(typeof(window.SimpelObject)==='undefined')window.SimpelObject=function(){return simpel();}
  if(typeof(window.VPoint)==='undefined')window.VPoint=function(x,y){if(x===undefined)return VPoint;else return point(x,y);}
  if(VObject&&SimpelObject&&VPoint)console.info("𝘷Σ: VObject loaded");
  else console.error("𝘷Σ: VObject could not be loaded");
}) (window);
