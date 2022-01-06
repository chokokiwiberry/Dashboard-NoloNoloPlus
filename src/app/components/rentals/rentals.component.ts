import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
showstatistics:boolean = false;
  constructor(private serviceLogic: ServiceLogicService) { }

  ngOnInit(): void {
  }
  showStatistics(){
    this.showstatistics = !this.showstatistics;
  }

  getRentals(){
    return this.serviceLogic.getRentals();
  }
}
