import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent implements OnInit {
  showemployees: boolean = false;
  showcustomers: boolean = false;
  showinventory: boolean = false;
  showrentals: boolean = false;
  showcompanies: boolean = false;
  showstatistics: boolean = false;
  showemployeeitem: boolean = false;
  showcustomeritem: boolean = false;
  constructor(public serviceLogic: ServiceLogicService) { }

  ngOnInit(): void {
    this.serviceLogic.employee_observable.subscribe(() => {
      if (this.serviceLogic.employees_toggle) {
        if (this.showcustomers || this.showinventory || this.showrentals || this.showemployeeitem || this.showcompanies || this.showcustomeritem) {
          this.showcustomers = false;
          this.showinventory = false;
          this.showrentals = false;
          this.showemployeeitem = false;
          this.showcompanies = false;
          this.showcustomeritem = false;
        }
        this.showemployees = true;
      }
    })

    //show the customers
    this.serviceLogic.customers_observable.subscribe(() => {
      if (this.serviceLogic.customers_toggle) {
        if (this.showemployees || this.showinventory || this.showrentals || this.showemployeeitem || this.showcompanies || this.showcustomeritem) {
          this.showemployees = false;
          this.showinventory = false;
          this.showrentals = false;
          this.showemployeeitem = false;
          this.showcompanies = false;
          this.showcustomeritem = false;

        }
        this.showcustomers = true;
      }
    })

    //show the inventory
    this.serviceLogic.inventory_observable.subscribe(() => {
      if (this.serviceLogic.inventory_toggle) {
        if (this.showemployees || this.showcustomers || this.showrentals || this.showemployeeitem || this.showcompanies || this.showcustomeritem) {
          this.showemployees = false;
          this.showcustomers = false;
          this.showrentals = false;
          this.showemployeeitem = false;
          this.showcompanies = false;
          this.showcustomeritem = false;

        }
        this.showinventory = true;
      }
    })

    //show the rentals
    this.serviceLogic.rental_observable.subscribe(() => {
      if (this.serviceLogic.rental_toggle) {
        if (this.showemployees || this.showcustomers || this.showinventory || this.showemployeeitem || this.showcompanies || this.showcustomeritem) {
          this.showemployees = false;
          this.showcustomers = false;
          this.showinventory = false;
          this.showemployeeitem = false;
          this.showcompanies = false;
          this.showcustomeritem = false;

        }
        this.showrentals = true;
      }

    })

    //show single employee item
    this.serviceLogic.employee_item_observable.subscribe(() => {
      if (this.serviceLogic.employee_item_toggle) {
        if (this.showemployees || this.showcustomers || this.showinventory || this.showcompanies || this.showrentals || this.showcustomeritem)
        this.showemployees = false;
        this.showcustomers = false;
        this.showinventory = false;
        this.showrentals = false;
        this.showcompanies = false;
        this.showcustomeritem = false;

      }
      this.showemployeeitem = true;
    })


    //showing companies to the manager
    this.serviceLogic.company_observable.subscribe(()=>{
      if(this.serviceLogic.company_toggle){
        if(this.showcustomers || this.showemployees || this.showemployeeitem || this.showinventory || this.showrentals || this.showcustomeritem){
          this.showcustomers = false;
          this.showemployeeitem = false;
          this.showemployees = false;
          this.showrentals = false;
          this.showinventory = false;
          this.showcustomeritem = false;
        }
        this.showcompanies = true;
      }
    })


    //view details of single customer
    this.serviceLogic.customer_item_observable.subscribe(()=>{
      if(this.serviceLogic.customer_item_toggle){
      if(this.showcustomers || this.showemployees || this.showemployeeitem || this.showinventory || this.showrentals || this.showcompanies){
        this.showcustomers = false;
        this.showemployeeitem = false;
        this.showemployees = false;
        this.showrentals = false;
        this.showinventory = false;
        this.showcompanies = false;
      }
      this.showcustomeritem = true;

    }

    })

  }



}
