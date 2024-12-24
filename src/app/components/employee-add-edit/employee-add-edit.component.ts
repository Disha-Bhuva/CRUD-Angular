import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../Models/employee';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-employee-add-edit',
  imports: [ReactiveFormsModule, MatButtonToggleModule],
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.css',
})
export class EmployeeAddEditComponent {
  empForm: FormGroup;
  employeeList: Employee[] = [];
  isEditMode: boolean = false;

  @Input() employee: Employee | null = null;
  @Output() employeeAdded = new EventEmitter<void>();
  @Output() employeeSaved = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    this.empForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      salary: ['', Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit() {
    if (this.employee) {
      this.empForm.patchValue(this.employee);
    }
  }

  ngOnChanges(): void {
    if (this.employee) {
      this.isEditMode = true;
      this.empForm.patchValue(this.employee);
    }
  }
  getAllEmployees() {
    this.employeeService.getAllEmployee().subscribe((employees) => {
      this.employeeList = employees;
    });
  }
  onSubmit() {
    if (this.empForm.valid) {
      const employeeData = this.empForm.value;
      if (this.isEditMode) {
        employeeData.id = this.employee?.id;
        this.employeeService
          .updateEmployee(employeeData.id, employeeData)
          .subscribe(() => {
            this.employeeSaved.emit();
            this.toastr.success('Employee updated successfully');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
      } else {
        this.employeeService.addEmployee(employeeData).subscribe(() => {
          this.employeeAdded.emit();
          this.toastr.success('Employee Added successfully');
          this.getAllEmployees();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    }
  }
}
