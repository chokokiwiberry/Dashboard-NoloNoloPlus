import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../Customer';
import { simpleHWman } from '../simpleHWman';
import { Listing } from '../Listing';
import { CUSTOMERS } from '../mock-customer';
import { simpleHWmen } from '../mock-simplehwman';
import { LISTINGS } from '../mock-listing';

import { RENTALS } from '../mock-rentals';
import { Product } from '../Product';
import { Rental } from '../Rental';
import { Category } from '../Category';

import { CATEGORIES } from '../mock-category';
import { COMPANIES } from '../mock-companies';
import { Company } from '../Company';
import { HttpClient, HttpHeaders } from '@angular/common/http';




const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
  })
}
@Injectable({
  providedIn: 'root'
})
export class ServiceLogicService {



employees_toggle: boolean = false;
customers_toggle: boolean = false;
inventory_toggle: boolean = false;
rental_toggle: boolean = false;
company_toggle: boolean = false; //shows the company stuff


/////manager obj
managerObj :simpleHWman = {
  id: '1',
  username: 'mock-alpaca-manager',
  name:'mock-alpaca',
  surname: 'mock-alpaca',
  role: 'manager',
  password:'ciao',
  companies:['alpaca', 'mucca'],
  rentals: []

};

//logic sidebar buttons
private employee_clicked = new Subject();
employee_observable = this.employee_clicked.asObservable();

private customers_clicked = new Subject();
customers_observable = this.customers_clicked.asObservable();

private inventory_clicked = new Subject();
inventory_observable = this.inventory_clicked.asObservable();

private rental_clicked = new Subject();
rental_observable = this.rental_clicked.asObservable();

private company_clicked = new Subject();
company_observable = this.company_clicked.asObservable();

//logic for single employee
employee_item_toggle: boolean = false;

employee_element: any;


//rentals


employeerentals: any; //completedrentals

  constructor(private http: HttpClient) { }

  employee_btn_clicked(){
    this.employees_toggle = true;
    this.employee_clicked.next(this.employees_toggle);
  }

  customer_btn_clicked(){
    this.customers_toggle = true;
    this.customers_clicked.next(this.customers_toggle);
  }

  inventory_btn_clicked(){
    this.inventory_toggle = true;
    this.inventory_clicked.next(this.inventory_toggle);
  }

  rental_btn_clicked(){
    this.rental_toggle = true;
    this.rental_clicked.next(this.rental_toggle);
  }

  account_btn_clicked(){
    this.company_toggle = true;
    this.company_clicked.next(this.company_toggle);
  }

  


private employee_item_clicked = new Subject();
employee_item_observable = this.employee_item_clicked.asObservable();

employee_item_btn_clicked(element: any){
  this.employee_item_toggle = true;
  this.employee_item_clicked.next(this.employee_item_toggle);
  this.employee_element = element;
}


//GET CALLS

getEmployees(): simpleHWman[]{
  return simpleHWmen; // qui invece ci sarà una chiamata http
}
getCustomers(): Customer[]{
  return CUSTOMERS; // qui invece ci sarà una chiamata http
}

getRentals(): Rental[]{
  return RENTALS;
}

async getListing(){
  let listing;
  let ans;
  listing = await this.http.get('/api/listing/allForThisSimpleHWMan').toPromise()
  return listing;
}

getListing1(): Listing[]{
  return LISTINGS; //qui invece ci sarà una chiamata http
}

getCategory(): Category[]{
  return CATEGORIES; // qui invece ci sarà una chiamata http
}


///////forse questa chiamata non verrà mai fatta 
getCompanies(): Company[]{
  return COMPANIES; //chiamata http per companies
}



////////////////////////// HANDLING SERVER RESPONSES
handle(stuff: any){
  switch (stuff.command){
      case 'redirect':
          window.location.href = stuff.msg;
          return null;
          break;
      case 'displayErr':
          console.log('in displayErr in handle')
          return stuff;
          break;
      case 'logErr':
          console.log(stuff.msg);
          return null;
      case 'noCommand':
          return stuff.msg;
          break;
      default:
          console.log(stuff);
          return null;
          break;
  }
}

// MOCK FUNCTION CALCULATE PRICE FOR RENTALS
calculatePrice(rental: any){
  let totPrice;
  
}



//////REGISTER STUFF 
registerUser(user: any): Observable<any>{
  return this.http.post<any>('/api/manager/reg', user, httpOptions);
}


///////LOGIN STUFF
logUser(user: any): Observable<any>{
  return this.http.post<any>('/api/manager/login', user, httpOptions);
}


/////////ISLOGGED
getManager(): Observable<any>{
  return this.http.get<any>('/api/manager/isLogged');
}


///////////LOGOUT
Logout(): Observable<any>{
  return this.http.delete<any>('/api/manager/logout');
}


///////////CREATE COMPANY
CreateCompany(data: any): Observable<any>{
  return this.http.post<any>('/api/company/create', data, httpOptions);
}

///////ADD COMPANY TO SELF
AddCompany(data: any): Observable<any>{
  return this.http.post<any>('/api/company/addToSelf', data, httpOptions);
}
}




