
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';

import { ServiceLogicService } from 'src/app/services/service-logic.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent {
  // employees = [] as any; //vettore di employees, con interfaccia Employee
  employees = [] as any;
  tmp = [] as any;
  companies = [] as any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'name', 'surname', 'company', 'role', 'actions'];
  showstatistics: boolean = false;
  navigationExtras!: NavigationExtras;

  rentals = [] as any;

  tmppastrental = [] as any;


  //variabili che vengono passate alla componente figlio - per fare le statistiche
  employeesparent = [] as any;
  rentalsparent = [] as any;


  constructor(private serviceLogic: ServiceLogicService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.serviceLogic.Loading();
    this.getEmployees()

  }

  arrayRentals(rentals: any) {
    let tmp = [];
    for (let i = 0; i < rentals.length; i++) {
      for (let j = 0; j < rentals[i].length; j++) {
        tmp.push(rentals[i][j])
      }
    }
    return tmp;
  }
  asyncGetRentals = async () => {

    try {
      //  console.log('sono pstdata da service', pstdata);
      const response = await fetch('/api/rental/allForCompanies', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //  body: JSON.stringify(pstdata) // body data type must match "Content-Type" header
      })
      const data = await response.json();
      // enter you logic when the fetch is successful
      //  this.serviceLogic.stopLoadingRentals();
      this.serviceLogic.stopLoading();
      let ans = this.serviceLogic.handle(data);

      if (ans.command === 'displayErr') {
        console.log('Something went wrong')
      }
      if (typeof ans === 'object') {
        let tmp = [] as any;
        tmp = this.arrayRentals(ans);
        this.rentalsparent = tmp;
        return tmp;
        console.log('sono rentals di async', ans)

      }

    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    }
  }

  getEmployees() {
    let ans;
    //  let responsedata;
    this.serviceLogic.getEmployees1().subscribe(
      async success => {
        //  this.serviceLogic.stopLoading();
        ans = this.serviceLogic.handle(success);
        if (ans.command === 'displayErr') {
          if (ans.msg === 'mustBeLoggedAsSimpleHWMan') {
            alert('Please login to access to data');
          }
          if (ans.msg === 'mustHaveCompanies') {
            alert('Data accessible only to the company members');
          }
        } else {
          if (typeof ans === 'object') {
            console.log('sono employees', ans)
            this.employeesparent = ans;
            this.tmp = ans;
            this.rentals = await this.asyncGetRentals();
            this.companies = this.serviceLogic.managerObj.companies;
            this.employees = ans
            this.dataSource.data = this.setData(this.employees);


          }
        }
      }, error => {
        this.serviceLogic.handle(error.responseJSON)
      }
    )
  }

  showStatistics() {
    this.showstatistics = !this.showstatistics;
  }


  setData(employees: any) {
    let tmp = [] as any;
    let tmpEmp;
    let index = 0;
    for (let i = 0; i < employees.length; i = i + 1) {
      tmpEmp = this.checkSameCompanies(employees[i], this.serviceLogic.managerObj)
      if (tmpEmp !== -1) {
        tmp[index] = tmpEmp;
        index = index + 1;
      }
    }
    console.log('setData', tmp);
    return tmp;
  }

  checkSameCompanies(employee: any, manager: any) {
    for (let i = 0; i < employee.companies.length; i = i + 1) {
      for (let j = 0; j < manager.companies.length; j = j + 1) {
        if (employee.companies[i] === manager.companies[j]) {
          return employee;
        }
      }
    }
    return -1;
  }



  //funzione che controlla che al manager vengano mostrati solo i dipendenti che sono della sua azienda
  //se il manager è proprietario dell'azienda alpace e mucca, il manager potrà vedere i dipendenti che lavorano in quelle aziende
  showCompanies(companies: any) {
    let mycompanies = [] as any;
    let index = 0;
    for (let i = 0; i < companies.length; i = i + 1) {
      for (let j = 0; j < this.serviceLogic.managerObj.companies.length; j = j + 1) {
        if (companies[i] === this.serviceLogic.managerObj.companies[j]) {
          mycompanies[index] = {
            objcompany: this.companies[i]
          }
          index = index + 1;
        }
      }
    }
    return mycompanies;
  }



  showDetails(element: any) {
    this.navigationExtras = element;
    this.serviceLogic.employee_item_btn_clicked(element);

  }


  getEmployeeRentals(rentals: any) {
    console.log('sono stato chiamato, getEmployeeRentals')
    console.log('sono this.rentals', rentals)
    console.log('sono employee element', this.serviceLogic.employee_element)
    if (rentals != null) {
      for (var i = 0; i < rentals.length; i = i + 1) {
        if (this.serviceLogic.employee_element !== 'undefined') {
          if (rentals[i].simpleHWman_id === this.serviceLogic.employee_element.id) {
            this.tmppastrental.push(rentals[i]);
          }
        }

      }
    }
    this.serviceLogic.employeerentals = this.tmppastrental;
    return this.serviceLogic.employeerentals;
  }











}
