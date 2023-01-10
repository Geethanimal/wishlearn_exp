import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    .<div class="container">
      .<div class="row justify-content-center align-items-center g-2">
        <div class="col">
          <a href="./login" class="btn btn-primary">Login</a>
        </div>
        <div class="col">
        <a href="./register" class="btn btn-primary">Register</a>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent {
}
