import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from './Models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}
  private apiUrl = 'http://localhost:7241/api/Employee';
  http = inject(HttpClient);
  getAllEmployee() {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  getEmployeeByID(id: number) {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  addEmployee(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  updateEmployee(id: number, employee: Employee) {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateEmployeeStatus(id: number, status: boolean) {
    const changestatus = { status }; // Assuming your API expects an object with the `status` property
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, changestatus);
  }
}
