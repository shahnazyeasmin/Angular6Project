import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: IEmployee[];

  constructor(private _employeeService: EmployeeService, private _router: Router) {
    console.log(this.employees);
  }

  ngOnInit() {
    // this._employeeService.getEmployees().subscribe(
    //   (listEmployees) => this.employees = listEmployees,
    //   (err) => console.log(err)
    // );
    console.log(this.employees);
    this._employeeService.getEmployees().subscribe((listEmployees) => {
      this.employees = listEmployees;
      console.log(this.employees);
    }, (err) => {
      console.log(err);
    });
    console.log(this.employees);
  }

  editButtonClick(employeeId: number) {
    this._router.navigate(['/edit', employeeId]);
   // this._router.navigate([`/edit/${employeeId}`]);
  }

}
