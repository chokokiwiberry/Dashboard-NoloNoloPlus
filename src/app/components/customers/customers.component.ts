import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { ServiceLogicService } from 'src/app/services/service-logic.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
showstatistics:boolean = false;
customers: any;
rentals: any;

chart: any = [];

displayedColumns: string[] = ['id', 'username', 'name', 'surname', 'broken', 'delayed', 'actions'];
dataSource = new MatTableDataSource();


  constructor(private serviceLogic : ServiceLogicService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
 this.dataSource.data = this.serviceLogic.getCustomers();
  }
  showStatistics(){
    this.showstatistics = !this.showstatistics;
    this.customers = this.serviceLogic.getCustomers;
    this.rentals = this.serviceLogic.getRentals;
  }

  getCustomers(){
    return this.serviceLogic.getCustomers();
  }

  getRentals(){
    return this.serviceLogic.getRentals();
  }

showDetails(element: any){
  this.serviceLogic.customer_item_btn_clicked(element);

}


}
