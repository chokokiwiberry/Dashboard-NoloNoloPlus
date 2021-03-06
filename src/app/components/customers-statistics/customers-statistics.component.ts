import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ServiceLogicService } from 'src/app/services/service-logic.service';
const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  })
}
@Component({
  selector: 'app-customers-statistics',
  templateUrl: './customers-statistics.component.html',
  styleUrls: ['./customers-statistics.component.css']
})


export class CustomersStatisticsComponent implements AfterViewInit {
  //dati riceuvti dalle componenti genitori
  @Input() customersdata!: any[];
  @Input() rentalsdata!: any[];


  chart: any = [];
  chart1: any = [];

  colors: any[] = [];

  //variabile generica per salvare risposta del server
  tmpresponse: any;


  constructor(private serviceLogic: ServiceLogicService, private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.serviceLogic.LoadingRentals();
    this.asyncPostCall(this.rentalsdata)

  }




  asyncPostCall = async (rentals: any) => {
    let chartCustomersRevenues = new CustomerRevenues(this.customersdata, this.serviceLogic, this.rentalsdata);
    let chartCustomersRentals = new CustomerRentals(this.customersdata, this.rentalsdata);

    let pstdata = [] as any;
    for (let i = 0; i < rentals.length; i++) {
      pstdata[i] = { priceObj: rentals[i].price[0], dateStart: rentals[i].dateStart, dateEnd: rentals[i].dateEnd }
    }
    try {
      const response = await fetch('/api/price/calcAll', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(pstdata) // body data type must match "Content-Type" header
      })
      const data = await response.json();
      // enter you logic when the fetch is successful
      this.serviceLogic.stopLoadingRentals();
      let ans = this.serviceLogic.handle(data);
      if (ans.command === 'displayErr') {
        console.log('Something went wrong')
      }
      if (typeof ans === 'object') {
        chartCustomersRevenues.RevenuesForEachCustomerChart(ans);
        chartCustomersRentals.RentalsForEachCustomerChart();

      }

    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    }
  }


}

export class Colors {
  customersdata = [] as any;
  colors = [] as any;
  constructor(customersdata: any) {
    this.customersdata = customersdata;
  }


  getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  settingColors(customersdata: any) {
    for (var i = 0; i < customersdata.length; i = i + 1) {
      this.colors[i] = 0;
    }

    for (var i = 0; i < customersdata.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }
    return this.colors;
  }
}

// classe che gestisce i fatturati dei clienti
export class CustomerRevenues {
  customersdata = [] as any;
  rentalsdata = [] as any;
  chart1: any = [];
  color = new Colors(this.customersdata)
  constructor(customersdata: any, private serviceLogic: ServiceLogicService, rentalsdata: any) {
    this.customersdata = customersdata;
    this.rentalsdata = rentalsdata;
  }

  getLabels() {
    let labels = [];
    if (this.customersdata != null) {
      for (var i = 0; i < this.customersdata.length; i = i + 1) {
        labels.push(this.customersdata[i].username);
      }
    }
    return labels;
  }


  RevenuesForEachCustomerChart(datas: any) {
    this.chart1 = new Chart('canvas1', {
      type: 'doughnut',

      data: {
        labels: this.getLabels(),
        datasets: [
          {
            data: this.salesForEachCustomer(this.rentalsdata, this.customersdata, datas), //from success 
            borderColor: '#3e95cd',
            label: 'Revenues',
            backgroundColor: this.color.settingColors(this.customersdata),

          },
        ],

      },
      options: {
        responsive: false,
        hover: {
          // Overrides the global setting
          mode: 'index'
        },
        plugins: {
          legend: {
            position: "right",
            align: "end",
            labels: {
              usePointStyle: false,
            },

          },
          title: {
            text: "Revenues for each customer",
            position: 'left',
            display: true
          }
        },
        maintainAspectRatio: false,
      }
    });
  }
  //funzione che calcola il fatturato per ogni cliente 
  salesForEachCustomer(rentals: any, customers: any, responsedata: any) {
    let result = {} as any;
    let tmp = [] as any;
    let ans = [] as any;
    ans = responsedata;


    console.log('sono ans customer', ans)
    // tmp = success
    //inizializzazione 
    for (var i = 0; i < customers.length; i = i + 1) {
      result[i] = 0;
    }
    for (let i = 0; i < rentals.length; i++) {
      for (let j = 0; j < customers.length; j++) {
        if (rentals[i].customer_id === customers[j]._id) {
          // tmp = await this.serviceLogic.calculatePrice(rentals[i])
          result[j] = result[j] + ans[i];
        }
      }
    }

    return result;
  }
}

export class CustomerRentals {
  customersdata = [] as any;
  rentalsdata = [] as any;
  chart: any = [];
  counters: number[] = []; //array of counters that counts rentals for each employee
  color = new Colors(this.customersdata)
  constructor(customersdata: any, rentalsdata: any) {
    this.customersdata = customersdata;
    this.rentalsdata = rentalsdata
  }


  getLabels() {
    let labels = [];
    if (this.customersdata != null) {
      for (var i = 0; i < this.customersdata.length; i = i + 1) {
        labels.push(this.customersdata[i].username);
      }
    }
    return labels;
  }
  RentalsForEachCustomerChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',

      data: {
        labels:
          this.getLabels()
        ,
        datasets: [
          {
            data: this.settingData(),
            borderColor: '#3e95cd',
            label: 'Rentals done',
            backgroundColor: this.color.settingColors(this.customersdata),

          },
        ],

      },
      options: {
        responsive: false,
        hover: {
          // Overrides the global setting
          mode: 'index'
        },
        plugins: {
          legend: {
            position: "right",
            align: "center",

            labels: {
              usePointStyle: false,

            },

          },
          title: {
            text: "Rentals for each customer",
            position: 'top',
            display: true
          }

        },

        maintainAspectRatio: false,
        scales: {
          yAxes: {
            title: {
              display: true,
              text: 'Number of reantals for each customer',
              font: {
                size: 15
              }
            },
            ticks: {
              precision: 0
            }
          },
          xAxes: {
            title: {
              display: true,
              text: 'Customers',
              font: {
                size: 15
              }
            }
          }
        }
      },

    });
  }


  //give a setting to the chart 
  settingData() {
    var data;
    var datasets;

    //inizializzazione 
    for (var i = 0; i < this.customersdata.length; i = i + 1) {
      console.log('sono inizliazzazione', i);
      this.counters[i] = 0;
      console.log('sono maremma', this.counters[this.customersdata[i]._id]);

    }

    //ho rental vuoti dei customers 
    // for (var i = 0; i < this.customersdata.length; i = i + 1) {
    //   for (var j = 0; j < this.customersdata[i].rentals.length; j = j + 1) {
    //     console.log(this.customersdata[i]._id, 'sono id');
    //     this.counters[i] = this.counters[i] + 1; //fa un conteggio per quanti noleggi ha un cliente
    //     console.log('sono oreo', this.counters[this.customersdata[i]._id]);


    //   }
    // }

    //incrocio i dati
    for (var i = 0; i < this.customersdata.length; i = i + 1) {
      for (var j = 0; j < this.rentalsdata.length; j++) {
        if (this.customersdata[i]._id === this.rentalsdata[j].customer_id) {
          this.counters[i] = this.counters[i] + 1
        }
      }
    }

    return this.counters;
  }
}