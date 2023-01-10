import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmotpComponent } from './confirmotp/confirmotp.component';
import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { DynamicHomeComponent } from './dynamic-home/dynamic-home.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    HomeComponent,
    RegisterComponent,
    ConfirmotpComponent,
    ForgetpwComponent,
    RegisterFormComponent,
    DynamicHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
