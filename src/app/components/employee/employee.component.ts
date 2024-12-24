import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';
import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-employee',
  imports: [MatTabsModule, EmployeeListComponent, EmployeeAddEditComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  selectedIndex = 0;
  isEditMode: boolean = false;
  selectedEmployee: Employee | null = null;

  onEditEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.isEditMode = true;
    this.selectedIndex = 1;
  }
  onDeleteEmployee() {
    this.selectedIndex = 0;
    this.isEditMode = false;
  }
  onEmployeeAdded() {
    this.selectedIndex = 0;
    this.isEditMode = false;
  }
  onEmployeeSaved() {
    this.selectedEmployee = null;
    this.selectedIndex = 0;
    this.isEditMode = false;
  }
}
