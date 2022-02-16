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
customersparent: any; //dati che vengono passati alla componente figlio 
chart: any = [];

displayedColumns: string[] = ['id', 'username', 'name', 'surname', 'broken', 'delayed', 'actions'];
dataSource = new MatTableDataSource();

  constructor(private serviceLogic : ServiceLogicService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.serviceLogic.Loading();
    this.getCustomers()
    
  }
  showStatistics(){
    this.showstatistics = !this.showstatistics;
    this.rentals = this.serviceLogic.getRentals;
  }



  getRentals(){
    return this.serviceLogic.getRentals();
  }

showDetails(element: any){
  this.serviceLogic.customer_item_btn_clicked(element);

}


//per avere i customers e passargli poi gli elementi is tutto ok 

//chiaamate per i customer

getCustomers() {
  let ans;
  this.serviceLogic.getCustomers().subscribe(
    success => {
      this.serviceLogic.stopLoading();
      ans = this.serviceLogic.handle(success);
      if(ans.command === 'logErr'){
        console.log(ans);
      }
      if (ans.command === 'displayErr') {
        if (ans.msg === 'mustBeLoggedAsSimpleHWMan') {
          alert('Please login to access to data');
        }
      } else {
        if (typeof ans === 'object') {
          console.log('sono cust', ans)
          this.dataSource.data = ans
        }
      }
  
    }, error =>{
      this.serviceLogic.handle(error.responseJSON)

    }
  )
}

}
