import { Component } from '@angular/core';
 
@Component({
 selector: 'app-root',
 template: `
 <div class="container-md">
   <router-outlet></router-outlet>
   <button (click)="logToConsole()">Test Debug</button>
 </div>
 `
})
export class AppComponent {


  logToConsole(){
    console.log('Hello Debugging');
  }

 }