import { Component, Input, OnInit } from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-rental-item',
  templateUrl: './rental-item.component.html',
  styleUrls: ['./rental-item.component.css']
})
export class RentalItemComponent implements OnInit {
@Input()rentals!: any;

  constructor(public serviceLogic: ServiceLogicService) { }

  ngOnInit(): void {
   
  }



}
