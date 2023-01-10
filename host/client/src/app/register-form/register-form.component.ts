import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-register-form',
  template: `
    <form class="register-form" autocomplete="off" [formGroup]="registerForm" (ngSubmit)="submitForm()">

     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="fname" formControlName="fname" placeholder="First Name" required>
       <label for="fname">First Name</label>
     </div>
 
     <div *ngIf="fname.invalid && (fname.dirty || fname.touched)" class="alert alert-danger">
       <div *ngIf="fname.errors?.['required']">
         First Name is required.
       </div>
       <div *ngIf="fname.errors?.['minlength']">
         First Name must be at least 3 characters long.
       </div>
     </div>

     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="lname" formControlName="lname" placeholder="Last Name" required>
       <label for="lname">Last Name</label>
     </div>
 
     <div *ngIf="lname.invalid && (lname.dirty || lname.touched)" class="alert alert-danger">
       <div *ngIf="lname.errors?.['required']">
         First Name is required.
       </div>
       <div *ngIf="lname.errors?.['minlength']">
         First Name must be at least 3 characters long.
       </div>
     </div>

     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="pno" formControlName="pno" placeholder="Phone Number" required>
       <label for="pno">Phone Number</label>
     </div>
 
     <div *ngIf="pno.invalid && (pno.dirty || pno.touched)" class="alert alert-danger">
       <div *ngIf="pno.errors?.['required']">
         Phone Number is required.
       </div>
       <div *ngIf="pno.errors?.['minlength']">
         Phone Number must be at least 10 characters long.
       </div>
     </div>

     <div class="form-floating mb-3">
       <input class="form-control" type="email" id="email" formControlName="email" placeholder="Email" required>
       <label for="email">Email</label>
     </div>
 
     <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">
       <div *ngIf="email.errors?.['required']">
         Email is required.
       </div>
       <div *ngIf="email.errors?.['minlength']">
         Email must be at least 3 characters long.
       </div>
     </div>

     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="dob" formControlName="dob" placeholder="Date of Birth" required>
       <label for="dob">Date of Birth</label>
     </div>
 
     <div *ngIf="dob.invalid && (dob.dirty || dob.touched)" class="alert alert-danger">
       <div *ngIf="dob.errors?.['required']">
          Date of Birth is required.
       </div>
       <div *ngIf="dob.errors?.['minlength']">
       Date of Birth must be at least 3 characters long.
       </div>
     </div>
 
     <div class="mb-3">
     <div class="mb-3">
       <label for="gender">Gender</label>
     </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="gender" name="gender" id="gender-male" value="male" required>
         <label class="form-check-label" for="level-junior">Male</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="gender" name="gender" id="gender-female" value="female">
         <label class="form-check-label" for="level-mid">Female</label>
       </div>
     </div>

     <div class="mb-3">
     <div class="mb-3">
       <label for="gender">Type</label>
     </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="type" name="type" id="gender-male" value="teacher" required>
         <label class="form-check-label" for="level-junior">Teacher</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="type" name="type" id="gender-female" value="student">
         <label class="form-check-label" for="level-mid">Student</label>
       </div>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="registerForm.invalid">Register</button>
   </form>
  `,
  styles: [`
    .register-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class RegisterFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  registerForm: FormGroup = new FormGroup({});

  constructor(private fb1: FormBuilder) { }

  get fname() { return this.registerForm.get('fname')!; }
  get lname() { return this.registerForm.get('lname')!; }
  get pno() { return this.registerForm.get('pno')!; }
  get email() { return this.registerForm.get('email')!; }
  get dob() { return this.registerForm.get('dob')!; }
  get gender() { return this.registerForm.get('gender')!; }
  get type() { return this.registerForm.get('type')!; }

  ngOnInit() {
    this.initialState.subscribe(user => {
      this.registerForm = this.fb1.group({
        fname: [user.fname, [Validators.required]],
        lname: [user.lname, [Validators.required]],
        pno: [user.pno, [Validators.required]],
        email: [user.email, [Validators.required]],
        dob: [user.dob, [Validators.required]],
        gender: [user.gender, [Validators.required]],
        type: [user.type, [Validators.required]]
        // position: [ employee.position, [ Validators.required, Validators.minLength(5) ] ],
        // level: [ employee.level, [Validators.required] ]
      });
    });

    this.registerForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.registerForm.value);
  }
}
