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
  showstatistics: boolean = false;
  customers: any;
  rentals: any;
  customersparent: any; //dati che vengono passati alla componente figlio 
  rentalsparent: any;
  chart: any = [];

  displayedColumns: string[] = ['username', 'name', 'surname', 'broken', 'delayed', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(private serviceLogic: ServiceLogicService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.serviceLogic.Loading();
    this.getCustomers()

  }
  showStatistics() {
    this.showstatistics = !this.showstatistics;
    // this.rentals = this.serviceLogic.getRentals;
  }

  asyncGetRentals = async () => {

    try {
      //  console.log('sono pstdata da service', pstdata);
      const response = await fetch('/api/rental/allForCompanies', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //  body: JSON.stringify(pstdata) // body data type must match "Content-Type" header
      })
      const data = await response.json();
      // enter you logic when the fetch is successful

      this.serviceLogic.stopLoading();
      let ans = this.serviceLogic.handle(data);

      if (ans.command === 'displayErr') {
        console.log('Something went wrong')
      }
      if (typeof ans === 'object') {

        let tmp = [] as any;
        tmp = this.arrayRentals(ans);
        return tmp;
      }

    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    }
  }


  arrayRentals(rentals: any) {
    let tmp = [];
    for (let i = 0; i < rentals.length; i++) {
      for (let j = 0; j < rentals[i].length; j++) {
        tmp.push(rentals[i][j])
      }
    }
    return tmp;
  }



  showDetails(element: any) {
    this.serviceLogic.customer_item_btn_clicked(element);

  }


  //per avere i customers e passargli poi gli elementi is tutto ok 

  //chiaamate per i customer

  getCustomers() {
    let ans;
    this.serviceLogic.getCustomers().subscribe(
      async success => {
        //  this.serviceLogic.stopLoading();
        ans = this.serviceLogic.handle(success);
        if (ans.command === 'logErr') {
          console.log(ans);
        }
        if (ans.command === 'displayErr') {
          if (ans.msg === 'mustBeLoggedAsSimpleHWMan') {
            alert('Please login to access to data');
          }
        } else {
          if (typeof ans === 'object') {
            this.dataSource.data = ans
            this.customersparent = ans
            this.rentalsparent = await this.asyncGetRentals();
          }
        }

      }, error => {
        this.serviceLogic.handle(error.responseJSON)

      }
    )
  }

}
