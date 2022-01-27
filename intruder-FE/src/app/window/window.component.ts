import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {fabric} from 'fabric';
import { bindCallback, reduce } from 'rxjs';
import * as $ from 'jquery';
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
  // someoneInside: boolean;
  canvas: any;
  matrixSize: any[] = [];
  boundaries: any[] = [
    //! give seperate boundaries for different objects
    // { id: 1, actualCoordinates: [{ x: 0.18, y: 0.38 }, { x: 0.82, y: 0.38 }, { x: 0.82, y: 0.62 }, { x: 0.18, y: 0.62 }, { x: 0.18, y: 0.38 }], color: '#A9A9A9', fill: '#A9A9A9', fillText: '' },
    { id: 1, actualCoordinates: [{ x: 0., y: 0}, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], color: '#A9A9A9', fill: '#A9A9A9', fillText: '' },
    //{ id: 2, actualCoordinates: [{ x: 0.65, y: 0.02 }, { x: 0.95, y: 0.02 }, { x: 0.95, y: 0.90 }, { x: 0.65, y: 0.90 }], color: 'black', fill: 'lightgrey', fillText: '' }
    //{ id: 2, actualCoordinates: [{ x: 0.65, y: 0.02 }, { x: 0.95, y: 0.02 }, { x: 0.95, y: 0.90 }, { x: 0.65, y: 0.90 }, { x: 0.26, y: 0.46 }], color: 'black', fill: 'lightgrey', fillText: 'CONTAINER' }
  ];
  matrixBoundaries: any[] = [];
  persons: any[] = [];
  position: any[] = [];
  alarm: boolean = false;
  alarmStatus: any;
  msg: string = '';
  direction: any;
  crane: string = '';
  lastUpdated: string = '';
  countFalse: number = 0;
  countYellow: number = 0;
  alarmGoingOn: boolean = false;
  
 
  constructor() { }

  ngAfterViewInit(){
    // console.log(this.container?.nativeElement.offsetWidth);
    // let x =document.getElementById('#areaContainer');
    // // console.log((this.container?.nativeElement as HTMLElement).offsetWidth)
    // let pos : any = x?.getBoundingClientRect();
    // console.log(pos);
    //! Draw for the first time
    this.draw(); 
    this.addCircle();
    this.createIm();
  }
  //! draw everytime when window resizes to scale
  //! Draw 
  @HostListener('window:resize', ['$event'])
onResize(event : any) {
  
  this.draw();
  this.resetCanvas();
  this.scaleCoordinates();
  this.addCircle();
  this.createIm();
}

  draw(){
    // this.imageWidth = 500;
    // this.imageHeight = 500;
    // this.imageWidth = this.container?.nativeElement.offsetWidth;
    // this.imageHeight = this.container?.nativeElement.offsetHeight;
    this.imageWidth = $('#areaContainer').width()!;
    this.imageHeight = $('#areaContainer').height()!;
    console.log(this.imageWidth);
    console.log(this.imageHeight);
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'crosshair',
      selection: false,
      backgroundColor : "#FFA",
      width: this.imageWidth ,
      height: this.imageHeight 
    });
  

    // this.canvas.add(
    //   new fabric.Rect({ top: 100, left: 100, width: 50, height: 50, fill: '#f55' }),
      
    // );
    this.scaleCoordinates();
    
  }

  ngOnInit() {
    // let x =document.getElementById('#areaContainer');
    // // console.log((this.container?.nativeElement as HTMLElement).offsetWidth)
    // let pos : any = x?.getBoundingClientRect();
    // this.imageWidth = 500;
    // this.imageHeight = 500;
    // console.log(this.imageWidth);
    // this.canvas = new fabric.Canvas('canvas', {
    //   hoverCursor: 'crosshair',
    //   selection: false,
    //   width: this.imageWidth,
    //   height: this.imageHeight
    // });
    // this.scaleCoordinates();
    // this.runLive();
    this.addCircle();
  }



  plotPlan() {
    let details = { coordinates: [{ x: 0, y: 0 }, { x: this.imageWidth, y: 0 }, { x: this.imageWidth, y: this.imageHeight }, { x: this.imageWidth, y: this.imageHeight }], fillText: 'RMGC 22' };
    this.renderText(details, 50, 10, true, false);
    //!for each given boundary render a polygon
    this.boundaries.forEach(boundary => {
      this.renderPolygon(boundary);
    });
  }


  // plotMap() {
  //   this.resetCanvas();
  //   let details = { coordinates: [{ x: 0, y: 0 }, { x: this.imageWidth, y: 0 }, { x: this.imageWidth, y: this.imageHeight }, { x: this.imageWidth, y: this.imageHeight }], fillText: 'RMGC 22' };
  //   this.renderText(details, 50, 10, true, false);

  //   if (this.persons.length > 0) {
  //     this.renderPolygon(this.boundaries[0]);
  //     this.persons.forEach(person => {
  //       let coordinates = this.matrixBoundaries.find(i => i.coords[0] === person[0] && i.coords[1] === person[1]);
  //       this.renderPolygon(coordinates);
  //     });
  //     this.renderPolygon(this.boundaries[1]);
  
  //   }
  //   else {
  //     this.boundaries.forEach(boundary => {
  //       this.renderPolygon(boundary);
  //     });
  //   }
  // }

  //! inorder to scale the cordinates
  scaleCoordinates() {
    this.boundaries.forEach(boundary => {
      boundary.coordinates = [];
      boundary.actualCoordinates.forEach((coords:any) => {
        //boundary.coordinates.push({ x: this.imageWidth * coords.x, y: this.imageHeight * coords.y });
        boundary.coordinates.push({ x: this.imageWidth * coords.x, y: this.imageHeight * coords.y });
      });
    });
    this.plotPlan();
  }

  // getMatrixCoordinates() {
  //   let row = this.matrixSize[0];
  //   let column = this.matrixSize[1];
  //   let red = this.boundaries.find(item => item.color === 'red').actualCoordinates;
  //   let startX = red[0].x;
  //   let startY = red[0].y;
  //   let distX = Math.abs((red[0].x - red[1].x) / column);
  //   let distY = Math.abs((red[0].y - red[3].y) / row);
  //   distX = Math.round((distX + Number.EPSILON) * 1000) / 1000;
  //   distY = Math.round((distY + Number.EPSILON) * 1000) / 1000;
  //   var topLeft = [];
  //   for (var i = 0; i < row; i++) {
  //     for (var j = 0; j < column; j++) {
  //       let tempX = startX + j * distX;
  //       let tempY = startY + i * distY;
  //       tempX = Math.round((tempX + Number.EPSILON) * 1000) / 1000;
  //       tempY = Math.round((tempY + Number.EPSILON) * 1000) / 1000;
  //       var data = { x: tempX, y: tempY, coords: [i + 1, j + 1] };
  //       topLeft.push(data);
  //     }
  //   }
  //   for (var i = 0; i < topLeft.length; i++) {
  //     var topRight = { x: topLeft[i].x + distX, y: topLeft[i].y };
  //     var bottomLeft = { x: topLeft[i].x, y: topLeft[i].y + distY };
  //     var bottomRight = { x: topLeft[i].x + distX, y: topLeft[i].y + distY };
  //     topLeft[i].x = Math.round((topLeft[i].x + Number.EPSILON) * 1000) / 1000;
  //     topLeft[i].y = Math.round((topLeft[i].y + Number.EPSILON) * 1000) / 1000;
  //     topRight.x = Math.round((topRight.x + Number.EPSILON) * 1000) / 1000;
  //     topRight.y = Math.round((topRight.y + Number.EPSILON) * 1000) / 1000;
  //     bottomLeft.x = Math.round((bottomLeft.x + Number.EPSILON) * 1000) / 1000;
  //     bottomLeft.y = Math.round((bottomLeft.y + Number.EPSILON) * 1000) / 1000;
  //     bottomRight.x = Math.round((bottomRight.x + Number.EPSILON) * 1000) / 1000;
  //     bottomRight.y = Math.round((bottomRight.y + Number.EPSILON) * 1000) / 1000;
  //     var allVertices = [{ x: topLeft[i].x, y: topLeft[i].y }, //topleft
  //     { x: topRight.x, y: topRight.y }, //topright
  //     { x: bottomRight.x, y: bottomRight.y }, //bottomRight
  //     { x: bottomLeft.x, y: bottomLeft.y }, //bottomLeft
  //     { x: topLeft[i].x, y: topLeft[i].y }]; // topleft
  //     this.matrixBoundaries.push({ coords: topLeft[i].coords, actualCoordinates: allVertices, color: 'red', fill: 'red' });
  //   }
  //   this.matrixBoundaries.forEach(boundary => {
  //     boundary.coordinates = [];
  //     boundary.actualCoordinates.forEach((coords:any) => {
  //       boundary.coordinates.push({ x: this.imageWidth * coords.x, y: this.imageHeight * coords.y });
  //     });
  //   });
  //   this.plotMap();
  // }
  // new fabric.Rect({ top: 100, left: 100, 
  //   width: 50, height: 50, fill: '#f55' }),

  // renderPolygon(boundary:any) {
  //   let polygon = new fabric.Rect(
  //     { top: 10, left: 10, 
  //       width: 500, height: 50,fill: '#A9A9A9' });
  //   this.canvas.add(polygon);
  //   if (boundary.fillText) {
  //      this.renderText(boundary, 50, 10, true, true);
  //   }
  // }
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
    if (boundary.fillText) {
      this.renderText(boundary, 50, 10, true, true);
    }
  }

  renderText(details:any, x:any, y:any, alignX:any, alignY:any) {
    let x1 = details.coordinates[0].x;
    let y1 = details.coordinates[0].y;
    let x2 = details.coordinates[2].x;
    let y2 = details.coordinates[2].y;
    var textSample = new fabric.Text(details.fillText, {
      fontSize: 18,
      left: (alignX) ? ((x1 + x2) / 2) - x : 20,
      top: (alignY) ? ((y1 + y2) / 2) - y : 20,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true
    });
    //! to render text use this
    // this.canvas.add(textSample);
  }

  resetCanvas() {
    let objects = this.canvas.getObjects();
    for (let i in objects) {
      this.canvas.remove(objects[i]);
    }
  }
  createCircle() {
    return new fabric.Circle({
      radius: 250, left: 400, top: 100, fill: '#FFFFFF',borderColor:'#000000',hasBorders:true,lockMovementX:true,lockMovementY:true
    });
  }
  
 // selectItemAfterAdded(obj: any) {
   // this.canvas.discardActiveObject().renderAll();
    //this.canvas.setActiveObject(obj);
  //}
  addCircle() {
    var c = this.createCircle();
    this.canvas.add(c);
    this.canvas.renderAll();
    //this.selectItemAfterAdded(c);
  }
  createIm()
  {
    fabric.Image.fromURL('/assets/images/incircle.png',(i) =>
    {
      //var oImg = i.set({ left:610, top: 320}).scale(0.2);
      var oImg = i.set({ left: this.imageWidth/3, top: this.imageHeight/2 -(this.imageHeight/3) + this.imageHeight/6}).scale(0.2);
      this.canvas.add(oImg);
      });
  }
  
}
