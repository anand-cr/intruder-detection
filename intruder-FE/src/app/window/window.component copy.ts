// import { Component, HostListener, OnInit } from '@angular/core';
// import {fabric} from 'fabric';

// @Component({
//   selector: 'app-window',
//   templateUrl: './window.component.html',
//   styleUrls: ['./window.component.css']
// })
// export class WindowComponent implements OnInit {
//   canvas: any;
//   width:any;
//   height:any;

//   constructor() { }

//   ngOnInit(): void {
    
//     this.width = window.innerWidth-16;
//     this.height = window.innerHeight-16;
//   }

//   @HostListener('window:resize', ['$event'])
// onResize(event : any) {
//   event.target.innerWidth;
  
//   this.resetCanvas()
  
//   this.width = window.innerWidth-16;
//   this.height = window.innerHeight-16;
//   this.draw()
  

// }

//   ngAfterContentInit(): void {
//     this.draw()
  

//   }

//   draw(){
//     this.canvas = new fabric.Canvas('canvas',{

//       width: this.width,
//       height: this.height
//     });


//   var rect = new fabric.Rect({
//     left: 20,
//     top: 20,
//     fill: 'red',
//     width: 20,
//     height: 20
//   });
  
  
//   this.canvas.add(rect);

//   }

//   resetCanvas() {
//     let objects = this.canvas.getObjects();
//     for (let i in objects) {
//       this.canvas.remove(objects[i]);
//     }
//   }
//   // canvas = new fabric.Canvas('c');

//   // // create a rectangle object
//   // var rect = new fabric.Rect({
//   //   left: 100,
//   //   top: 100,
//   //   fill: 'red',
//   //   width: 20,
//   //   height: 20
//   // });
  
//   // // "add" rectangle onto canvas
//   // canvas.add(rect);
  
// }
