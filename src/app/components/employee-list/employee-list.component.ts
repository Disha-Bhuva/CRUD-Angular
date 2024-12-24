import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-employee-list',
  imports: [MatButtonToggleModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employeeList: Employee[] = [];
  @Input() EmployeeList: Employee[] = [];
  @Output() editEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<number>();
  @Output() switchToEmployeeListTab = new EventEmitter<void>();

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  //==========================================================================
  onStatusChange(event: MatButtonToggleChange, employee: Employee): void {
    event.source._buttonElement.nativeElement.click();
    employee.status = event.value;
    this.employeeService
      .updateEmployeeStatus(employee.id, employee.status)
      .subscribe(() => {});
    this.toastr.success('Employee status updated successfully!');
  }

  //========================================================================
  oneditEmployee(employee: Employee, event: Event) {
    event.stopPropagation();
    this.editEmployee.emit(employee);
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  //========================================================================
  getAllEmployees() {
    this.employeeService.getAllEmployee().subscribe((employees) => {
      this.employeeList = employees;
    });
  }

  onDelete(Employee: Employee) {
    const isConfirmed = confirm('Are you sure want to delete this employee');
    if (isConfirmed) {
      this.employeeService.deleteEmployee(Employee.id).subscribe((res) => {
        this.switchToEmployeeListTab.emit();

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        this.toastr.success('employee deleted successfully..');
      });
    }
  }
}
