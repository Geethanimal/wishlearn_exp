import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DynamicHomeComponent } from './dynamic-home/dynamic-home.component';
 
const routes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'employees', component: EmployeesListComponent },
 { path: 'employees/new', component: AddEmployeeComponent },
 { path: 'employees/edit/:id', component: EditEmployeeComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'dynamic-home', component: DynamicHomeComponent }
];
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }