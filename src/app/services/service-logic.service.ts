import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../Customer';
import { simpleHWman } from '../simpleHWman';
import { Listing } from '../Listing';
import { Product } from '../Product';
import { Rental } from '../Rental';
import { Company } from '../Company';
import { HttpClient, HttpHeaders } from '@angular/common/http';




const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
  })
}

const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
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
customer_item_toggle: boolean = false;


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

private customer_item_clicked = new Subject();
customer_item_observable = this.customer_item_clicked.asObservable();

//logic for single employee
employee_item_toggle: boolean = false;

employee_element: any;

customer_element: any; // per passare il singolo elemento da una componente all'altra


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


customer_item_btn_clicked(element: any){
  this.customer_item_toggle = true;
  this.customer_item_clicked.next(this.customer_item_toggle);
  this.customer_element = element;

}
//// funzioni per il loading della gif e stop loading
Loading(){
  $('#maincontent').css('display', 'none');
  $('#loading').css('display', 'block');
}
stopLoading(){
  $('#maincontent').css('display', 'block');
  $('#loading').css('display', 'none');

}

LoadingRentals(){
  $('.hideshowstats').css('display', 'none');
  $('#loading_cat').css('display', 'block');
}

stopLoadingRentals(){
  $('.hideshowstats').css('display', 'block');
  $('#loading_cat').css('display', 'none');
}


//funzione per arrotondare le cifre decimali dei prezzi
truncateByDecimalPlace = (value: any, numDecimalPlaces: any) =>
  Math.trunc(value * Math.pow(10, numDecimalPlaces)) / Math.pow(10, numDecimalPlaces)
//GET CALLS

// 
getCustomers(): Observable<any>{
  return this.http.get<any>('/api/customer/all');    // qui invece ci sarà una chiamata http
}
getRentals1():Observable<any>{
  return this.http.get<any>('/api/rental/allForCompanies');
}


getEmployees1(): Observable<any>{
  return this.http.get<any>('/api/employee/all')
}

getListing():Observable<any>{
  return this.http.get<any>('/api/listing/allForThisSimpleHWMan');

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




