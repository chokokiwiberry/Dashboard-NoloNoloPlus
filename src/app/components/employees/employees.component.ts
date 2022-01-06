import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { simpleHWmen } from 'src/app/mock-simplehwman';

import { ServiceLogicService } from 'src/app/services/service-logic.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent  {
 // employees = [] as any; //vettore di employees, con interfaccia Employee
 employees = [] as any;
 tmp = [] as any;
 companies = [] as any;
 dataSource = new MatTableDataSource();
 companiesDataSrc = new MatTableDataSource();
 displayedColumns: string[] = ['id', 'username', 'password', 'name', 'surname', 'company', 'role', 'actions'];
 showstatistics: boolean = false;
 navigationExtras!:  NavigationExtras;

 rentals = [] as any;

 tmpfuturerental =[] as any;
 tmpcurrentrental = [] as any;
 tmppastrental = [] as any;


 tmp1 = [] as any;



 myDate = new Date();
 

  constructor(private serviceLogic: ServiceLogicService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.tmp = this.serviceLogic.getEmployees();
    this.rentals = this.serviceLogic.getRentals();
    this.companies = this.serviceLogic.getCompanies();
    this.employees = this.serviceLogic.getEmployees();
    this.dataSource.data = this.setData(this.employees);
  }

 

  showStatistics(){
    this.showstatistics = !this.showstatistics;
  }

  setData(employees: any){
    let tmp = [];
    for (var i=0; i<employees.length; i=i+1){
      tmp[i] = {
        id: employees[i].id,
        name: employees[i].name,
        surname: employees[i].surname,
        username: employees[i].username,
        password: employees[i].password,
        role: employees[i].role,
        rentals: employees[i].rentals,
        companies: employees[i].companies
      }
    }
    return tmp;
  }
  setData1(employees: any, companies: any){
    let ind = 0; // indice dei nuovi oggetti che contengono employees + companies
    let indc = 0; // indice usato per indicizzare l'oggetto company
    let tempEmp = []; //vettore usato per creare l'oggetto employee + company
    let comTmp  = []; //vettore che contiene le aziende di un employee
    for (var i=0; i<employees.length; i=i+1){
      indc = 0;
      comTmp = [];
      for (var j=0; j<employees[i].companies.length; j=j+1){
        if (employees[i].companies.length > 0){
          for (var k=0; k<companies.length; k=k+1){
            if (companies[k].id == employees[i].companies[j]){
              comTmp[indc] = companies[k];
              indc = indc + 1;
            }
          }
        }
      }
      tempEmp[ind] = {
        id: employees[i].id,
        name: employees[i].name,
        surname: employees[i].surname,
        username: employees[i].username,
        password: employees[i].password,
        role: employees[i].role,
        rentals: employees[i].rentals,
        companies: comTmp
      }
      ind = ind + 1;
     
    }
    return tempEmp;
  }


  showDetails(element:any){
    this.navigationExtras = element;
    this.serviceLogic.employee_item_btn_clicked(element);
    console.log("visualizza di un funzionario completo", this.navigationExtras);
   
    this.getPastRentals();
   //this.router.navigateByUrl('/employee', {state:this.navigationExtras});
  }


    //per passare future rentals a rental-item
    getFutureRentals():any{
 
    }

    getCurrentRentals(): any{
      

    }
    getPastRentals(){
      if (this.rentals!=null){
        for (var i=0; i<this.rentals.length; i=i+1){
          if (this.rentals[i].simpleHWman_id == this.serviceLogic.employee_element.id){
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
   getEmployees(){
     return this.serviceLogic.getEmployees();
   }
  
  getRentals(){
    return this.serviceLogic.getRentals();
  }


  //function that receives the input from the search-filter component
  applyFilter(event: any){
    
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
