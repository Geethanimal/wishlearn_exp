import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  template: `
  <h2 class="text-center m-5">Register here</h2>
  <app-register-form (formSubmitted)="register($event)"></app-register-form>
  `,
  styles: [
  ]
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  register(user: User) {
    this.userService.createUser(user)
      .subscribe({
        next: () => {
          this.router.navigate(['/dynamic-home']);
        },
        error: (error) => {
          alert("Failed to create user");
          console.error(error);
        }
      });
  }

}
