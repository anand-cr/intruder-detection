import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {fabric} from 'fabric';
import { bindCallback, reduce, take, timer } from 'rxjs';
import * as $ from 'jquery';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  //! ???
  @ViewChild('container') container : ElementRef | undefined ;
  imageWidth: number = 0;
  imageHeight: number = 0;
  canvas: any;
  matrixSize: any[] = [];
  
 
  //! give seperate boundaries for different objects
  //! Uncomment it to fit the canvas with a polyline
  boundaries: any[] = [
    // { id: 1, actualCoordinates: [{ x: 0.18, y: 0.38 }, { x: 0.82, y: 0.38 }, { x: 0.82, y: 0.62 }, { x: 0.18, y: 0.62 }, { x: 0.18, y: 0.38 }], color: '#A9A9A9', fill: '#A9A9A9', fillText: '' },
    // { id: 1, actualCoordinates: [{ x: 0., y: 0}, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], color: '#A9A9A9', fill: '#A9A9A9', fillText: '' },
    //{ id: 2, actualCoordinates: [{ x: 0.65, y: 0.02 }, { x: 0.95, y: 0.02 }, { x: 0.95, y: 0.90 }, { x: 0.65, y: 0.90 }], color: 'black', fill: 'lightgrey', fillText: '' }
    //{ id: 2, actualCoordinates: [{ x: 0.65, y: 0.02 }, { x: 0.95, y: 0.02 }, { x: 0.95, y: 0.90 }, { x: 0.65, y: 0.90 }, { x: 0.26, y: 0.46 }], color: 'black', fill: 'lightgrey', fillText: 'CONTAINER' }
 ];

  imx:any;
  imy:any;
  radiusCircle =0
  c: any;
  fillColor : '#FFFFFF'
  // distance=200
  | undefined

  distance=195
  angle= 90
  constructor() { }

  ngAfterViewInit(){
    //! Draw for the first time
    this.draw(); 
    // this.addCircle()
    // this.createIm()
    // this.createInIm(100,10);
  }


@HostListener('window:resize', ['$event'])
onResize(event : any) {
 //todo put reset canvas before everything else it will glitch
 this.resetCanvas();
 this.draw();   
  //this.scaleCoordinates();
  // this.addCircle();
  // this.createIm()
  // this.createInIm(10,10);
}



  draw(){
    // this.imageWidth = 500;
    // this.imageHeight = 500;
    // this.imageWidth = this.container?.nativeElement.offsetWidth;
    // this.imageHeight = this.container?.nativeElement.offsetHeight;
    this.imageWidth = $('#areaContainer').width()!;
    this.imageHeight = $('#areaContainer').height()!;
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'crosshair',
      selection: false,
      backgroundColor : "#dddddd",
      width: this.imageWidth ,
      height: this.imageHeight 
    });
    this.addCircle()
    this.createIm()
    this.createIntruderImage(this.distance,this.angle)
   // this.createInIm(150,10);
    // this.scaleCoordinates();
  }

  ngOnInit() {
    
  }

  //! FOR POLYLINE
  renderPolygon(boundary:any) {
    let polyline = new fabric.Polyline(boundary.coordinates, {
      fill: boundary.fill,
      stroke: boundary.color,
      strokeWidth: 2,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true
    });
    this.canvas.add(polyline);

    // if (boundary.fillText) {
    //   this.renderText(boundary, 50, 10, true, true);
    // }
  }

  //! RENDER TEXT
  // renderText(details:any, x:any, y:any, alignX:any, alignY:any) {
  //   let x1 = details.coordinates[0].x;
  //   let y1 = details.coordinates[0].y;
  //   let x2 = details.coordinates[2].x;
  //   let y2 = details.coordinates[2].y;
  //   var textSample = new fabric.Text(details.fillText, {
  //     fontSize: 18,
  //     left: (alignX) ? ((x1 + x2) / 2) - x : 20,
  //     top: (alignY) ? ((y1 + y2) / 2) - y : 20,
  //     hasControls: false,
  //     hasRotatingPoint: false,
  //     lockMovementX: true,
  //     lockMovementY: true
  //   });
  //   //! to render text use this
  //   // this.canvas.add(textSample);
  // }

  resetCanvas() {
    let objects = this.canvas.getObjects();
    for (let i in objects) {
      this.canvas.remove(objects[i]);
    }
  }


radius = 1;
  createCircle() {
    return new fabric.Circle({
   //   radius: 250, left: 400, top: 100, fill: '#FFFFFF',borderColor:'#000000',hasBorders:true,lockMovementX:true,lockMovementY:true
   //radius: this.imageHeight/3, left: this.imageWidth/2 -(this.imageHeight/3) , top: this.imageHeight/2 -(this.imageHeight/3), fill: '#FFFFFF',borderColor:'#000000',hasBorders:true,lockMovementX:true,lockMovementY:true
   radius: this.imageWidth/5 *this.radius, fill: '#FFFFFF',borderColor:'#000000',hasBorders:true,lockMovementX:true,lockMovementY:true
   
  });

  
  }

checkIntrution(oImg: { setCoords: () => void; isContainedWithinObject: (arg0: any) => any; }){
 
  
  if(this.c.isContainedWithinObject(oImg)){
    console.log(this.c.type());
              console.log("yes");
              // console.log(oImg.getCoords()[0]); 
              // oImg.set({left:oImg.getCoords()[0].x,top:oImg.getCoords()[0].y})
                
                // obj.setLeft(goodleft);
                // canvas.refresh();    
            } else {
              console.log("no");
                
            }
            
          }

  
  
  addCircle() {
    this.c = this.createCircle();
   // var b= this.createCircleb();
   // var t=this.createtriangle();
    this.canvas.add(this.c);
   // this.canvas.add(b);
    // this.canvas.add(t);
    //todo -> adjust z index
    //this.canvas.sendToBack(this.c)
    this.radiusCircle = this.c.getRadiusX()
    this.canvas.centerObject(this.c)
    this.canvas.renderAll();
    // console.log("radius of c "+ c.radius);
    // console.log("left c "+ c.left);
    //this.selectItemAfterAdded(c);
    // console.log(this.radiusCircle);
    this.boundObjectWithinCircle()
    this.checkIntrution(this.c)
    
  }


  createIm()
  {
    fabric.Image.fromURL('/assets/images/incircle1.png',(i) =>
    {
      //var oImg = i.set({ left:610, top: 320}).scale(0.2);
      var oImg = i.set({ left: this.imageWidth/3, top: this.imageHeight/2 -(this.imageHeight/3) + this.imageHeight/6}).scale(this.radiusCircle*0.005);
      this.canvas.centerObject(oImg);
      // var bound = i.getBoundingRec();
      this.canvas.add(oImg);
      // this.canvas.bringToFront(oIm)
      var imageCenter = oImg.getCenterPoint();
      //console.log(imageCenter);
      this.imx=oImg.getCenterPoint().x;
      this.imy=oImg.getCenterPoint().y;
      this.boundObjectWithinCanvas()
      //this.canvas.clipPath = this.c
      
    //   this.canvas.on("object:moving", () =>{
    //     var obj = oImg;
    //     var bounds = this.c;
    //     oImg.setCoords();        
    //     if(!oImg.isContainedWithinObject(this.c)){
    //       console.log("yes");
    //       // console.log(oImg.getCoords()[0]); 
    //       // oImg.set({left:oImg.getCoords()[0].x,top:oImg.getCoords()[0].y})
            
        
          
    //         // obj.setLeft(goodleft);
    //         // canvas.refresh();    
    //     } else {
    //       console.log("no");
            
    //     }  
    // });



      
      })

      //todo -> create a boundary
      

  }

  // createInIm(distance:number,angle:number)
  // { 
  //   //console.log("image is loaded");

  //   //var pointX = this.imx + distance  //* Math.cos(angle);
  //   var pointX = this.imx + distance//* Math.cos(angle) // + (distance - this.imageWidth/5)
  //   var pointY = this.imy + distance
  //   console.log("pointX "+ pointX);
  //   console.log("center of circle:"+ this.imx)
  //   console.log(this.imageWidth/5);
  //  // var pointY = this.imy + distance //* Math.sin(angle) ;

  //   fabric.Image.fromURL('/assets/images/trolley.png',(im) =>
  //   { 
  //     //var oImg = i.set({ left:610, top: 320}).scale(0.2);
  //     var oInImg = im.set({ left:pointX, top: pointY, originX :"center" , originY :"center"}).scale(this.radiusCircle*0.0009);     
  //     //var oInImg = im.set({ left:pointX})//.scale(this.radiusCircle*0.0009);     
  //     //var bound = im.getBoundingRect();
  //     // this.canvas.renderAll(oInImg)
      
  //     this.canvas.add(oInImg);
  //     this.canvas.centerObject(oInImg);
  //     console.log(oInImg.getCoords()); 
  //     // console.log("image is rendered");
     
      
  //     });

      
      
  // }
  

  createIntruderImage(distance:number , angle: number){
    //todo only done wrt to center , find center cordinates to allign with other Point of refernces
    fabric.Image.fromURL('/assets/images/cart1.png', (myImg) => {
      var angleInDeg = angle * 0.01745329251
      var s = Math.sin(angle); // angle is in radians
      var c = Math.cos(angle);

      // var x_cord = this.distance*(0.001*this.imageWidth) - this.imx
      // var y_cord = this.distance*(0.001*this.imageWidth)
//todo to make it scale wrt to height , change the image width to height
      var leftDist = this.imx + this.distance*(0.001*this.imageWidth)*Math.cos(angleInDeg);
      var topDist = this.imy -(this.distance*(0.001*this.imageWidth))*Math.sin(angleInDeg);
      // console.log(this.distance*(0.001*this.imageWidth)* Math.tan(this.angle));
      // console.log(topDist);
      // console.log(this.distance*(0.001*this.imageWidth));
      var img1 = myImg.set({ left: leftDist , top:topDist, originX :"center" , originY :"center" }).scale(0.002*this.imageWidth);
      this.canvas.add(img1); 
     this.boundObjectWithinCanvas()



     if (this.distance*(0.001*this.imageWidth) < this.imageWidth/5 *this.radius){
      //  var timeout = setTimeout(() =>{
      //   
      //   this.canvas.renderAll();
      // }, 100)
      setInterval(async () => {
      
      this.c.set({fill :"#ff726f"})
      this.canvas.renderAll();
      // this.canvas.add(this.c)
      await timer(100).pipe(take(1)).toPromise();
      this.c.set({fill :"white"})
      // this.canvas.add(this.c)
      this.canvas.renderAll();

   }, 250);
          

          
    
      
      // setInterval(() => {
      //   if (this.count % 2 == 0){
      //     console.log("red");
      //     this.c.set({fill :"red"})
      //     console.log(this.count);
      //     this.count = this.count +1
          
      //   }else{
      //     this.setColorWhite(this.count)
      //     this.count = this.count +1
      //   }
      // }, 1000);
    }
    else{
       console.log("no");

     } 
     });
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  count=0
  setColorWhite(count: number){
    console.log("red");
    this.c.set({fill :"white"})
    //console.log(this.count);
    
    
  }

  
animate(){
  console.log("red");
  this.c.set({fill :"red"})
}

  //todo Does not fix with scaling
  boundObjectWithinCanvas(){
    this.canvas.on('object:moving', function (e: { target: any; }) {
      var obj = e.target;
      // if object is too big ignore
      //console.log(obj.type)
      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
        return;
      }
      obj.setCoords();
      // top-left  corner
      if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
        obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
      }
      // bot-right corner
      if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
        obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
        obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
      }
    });

    
  }

  
  boundObjectWithinCircle(){
    this.c.on('object:moving', function (e: { target: any; }) {
      var obj = e.target;
      console.log(obj.type)
       // if object is too big ignore
      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
          return;
      }        
      obj.setCoords();        
      // top-left  corner
      if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
          obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
          obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
      }
      // bot-right corner
      if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
          obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
          obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
      }
    });
  
  
  }




  //! to fix the scaling out issue

//   boundWithinCanvasScale(){
//     this.canvas.on('object:scaling', (e) => this._handleScaling(e));

// }

// _handleScaling(e: { target: any; }) {
//   var obj = e.target;
//   var brOld = obj.getBoundingRect();
//   obj.setCoords();
//   var brNew = obj.getBoundingRect();

//   if(brOld.left >= 0 && brNew.left < 0) {
//     let scale = (brOld.width + brOld.left) / obj.width;
//     let height = obj.height * scale;
//     let top = ((brNew.top - brOld.top) / (brNew.height - brOld.height) *
//       (height - brOld.height)) + brOld.top;
//     this._setScalingProperties(0, top, scale);

//      // top border
//   if(brOld.top >= 0 && brNew.top < 0) {
//     let scale = (brOld.height + brOld.top) / obj.height;
//     let width = obj.width * scale;
//     let left = ((brNew.left - brOld.left) / (brNew.width - brOld.width) * 
//       (width - brOld.width)) + brOld.left;
//     this._setScalingProperties(left, 0, scale);
//   }
//   // right border
//   if(brOld.left + brOld.width <= obj.canvas.width 
//   && brNew.left + brNew.width > obj.canvas.width) {
//     let scale = (obj.canvas.width - brOld.left) / obj.width;
//     let height = obj.height * scale;
//     let top = ((brNew.top - brOld.top) / (brNew.height - brOld.height) * 
//       (height - brOld.height)) + brOld.top;
//     this._setScalingProperties(brNew.left, top, scale);
//   }
//   // bottom border
//   if(brOld.top + brOld.height <= obj.canvas.height 
//   && brNew.top + brNew.height > obj.canvas.height) {
//     let scale = (obj.canvas.height - brOld.top) / obj.height;
//     let width = obj.width * scale;
//     let left = ((brNew.left - brOld.left) / (brNew.width - brOld.width) * 
//       (width - brOld.width)) + brOld.left;
//     this._setScalingProperties(left, brNew.top, scale);

//     if(brNew.left < 0
//       || brNew.top < 0
//       || brNew.left + brNew.width > obj.canvas.width
//       || brNew.top + brNew.height > obj.canvas.height) {
//         obj.left = this.scalingProperties['left'];
//         obj.top = this.scalingProperties['top'];
//         obj.scaleX = this.scalingProperties['scaleX'];
//         obj.scaleY = this.scalingProperties['scaleY'];
//         obj.setCoords();
//       }// else {
//       //   this.scalingProperties = null;
//       // }
//     }  
//   } 
 

// }
// _setScalingProperties(left: number, top: number, scale: number) {
//   if(this.scalingProperties == null 
//   || this.scalingProperties['scaleX'] > scale) {
//     this.scalingProperties = {
//       'left': left,
//       'top': top,
//       'scaleX': scale,
//       'scaleX': scale
//     };
//   }
// }
// scalingProperties = {
//   'left': 0,
//   'top': 0,
//   'scaleX': 0,
//   'scaleY': 0
// }

}



//!---------------------- issues to fix-----------
//todo glitch when we click on another object
//todo inner circle not selectable after resizing a few times
//todo shouldnt move out of 
//todo not scalable wrt height
// make intruder image center the point of reference for transformation



