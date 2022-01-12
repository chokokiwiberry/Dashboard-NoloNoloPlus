
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/menu/menu-trigger';

import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { simpleHWmen } from 'src/app/mock-simplehwman';

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
  companiesDataSrc = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username', 'password', 'name', 'surname', 'company', 'role', 'actions'];
  showstatistics: boolean = false;
  navigationExtras!: NavigationExtras;

  rentals = [] as any;

  tmpfuturerental = [] as any;
  tmpcurrentrental = [] as any;
  tmppastrental = [] as any;


  tmp1 = [] as any;



  myDate = new Date();


  constructor(private serviceLogic: ServiceLogicService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.tmp = this.serviceLogic.getEmployees();
    this.rentals = this.serviceLogic.getRentals();
    this.companies = this.serviceLogic.getCompanies();
    this.employees = this.serviceLogic.getEmployees();
    this.dataSource.data = this.setData(this.employees);
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
        if (employee.companies[i].id === manager.companies[j].id) {
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
        if (companies[i].id === this.serviceLogic.managerObj.companies[j].id) {
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
    console.log("visualizza di un funzionario completo", this.navigationExtras);

    this.getPastRentals();
    //this.router.navigateByUrl('/employee', {state:this.navigationExtras});
  }


  //per passare future rentals a rental-item
  getFutureRentals(): any {

  }

  getCurrentRentals(): any {


  }
  getPastRentals() {
    if (this.rentals != null) {
      for (var i = 0; i < this.rentals.length; i = i + 1) {
        if (this.rentals[i].simpleHWman_id == this.serviceLogic.employee_element.id) {
          //controllare le date e prendere solo quelli che hanno la data di scadenza 
          //prima quella di oggi
          this.tmppastrental.push(this.rentals[i]);
        }
      }
    }
    this.serviceLogic.pastrentals = this.tmppastrental;
    return this.serviceLogic.pastrentals;
  }



  //functions to send data to the child statistics component 
  getEmployees() {
    return this.serviceLogic.getEmployees();
  }

  getRentals() {
    return this.serviceLogic.getRentals();
  }


  //function that receives the input from the search-filter component
  applyFilter(event: any) {

    // this.transform(this.dataSource.data, event);

  }

  /* transform(value: any, searchText: any): any {
     if(!searchText) {
       return value;
     }
     return value.filter((data: any) => this.matchValue(data,searchText)); 
   }
 
   matchValue(data: any, value: any) {
     return Object.keys(data).map((key) => {
        return new RegExp(value, 'gi').test(data[key]);
     }).some(result => result);
   } */

}
