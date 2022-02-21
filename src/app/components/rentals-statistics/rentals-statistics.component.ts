import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ServiceLogicService } from 'src/app/services/service-logic.service';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-rentals-statistics',
  templateUrl: './rentals-statistics.component.html',
  styleUrls: ['./rentals-statistics.component.css']
})

export class RentalsStatisticsComponent implements OnInit {
  @Input() rentalsdata!: any[];
  rentalsdata_: any; //variabile che verrà poi passata alla componente figlio tmprent
  companies: any;
  constructor(private serviceLogic: ServiceLogicService){

  }
  ngOnInit(): void {
    this.rentalsdata_ = this.rentalsdata;
    this.companies = this.serviceLogic.managerObj.companies;
  }

}