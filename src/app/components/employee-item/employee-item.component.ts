import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { simpleHWman } from 'src/app/simpleHWman';
import { ServiceLogicService } from 'src/app/services/service-logic.service';


@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {
employee!: any;
rentals!: any;
futurerentals: any;

panelOpenState = false;
  constructor(private serviceLogic: ServiceLogicService) {
   
   }

  ngOnInit(): void {
    this.employee = this.serviceLogic.employee_element;
    console.log('sono stato cliccato da show details di employees e sono employee item', this.employee );
  //  this.rentals = this.serviceLogic.getRentals();
  }



}
