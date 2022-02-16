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
  //input che ricevo dalla componente genitore
  @Input() rentalsdata!: any[];

  chart: any = [];
  chart1: any = [];
  chart2: any = [];


  counters: number[] = []; //array of counters that count rentals for each employee



  constructor(private serviceLogic: ServiceLogicService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.serviceLogic.LoadingRentals();
    this.asyncPostCall(this.rentalsdata);

    let chartDateRentals = new DatesRentals();
    chartDateRentals.RentalsPerMonth(this.rentalsdata)



  }


  asyncPostCall = async (rentals: any) => {
    let chartRevenuesRentals = new RevenuesRentals(this.serviceLogic);
    let pstdata = [] as any;
    for (let i = 0; i<rentals.length; i++){
       pstdata[i] = {priceObj: rentals[i].price[0], dateStart :rentals[i].dateStart, dateEnd:rentals[i].dateEnd}
    }
    try {
      console.log('sono pstdata da service', pstdata);
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
      if (ans.command === 'displayErr'){
        console.log('Something went wrong')
      } 
      if (typeof ans === 'object'){
        chartRevenuesRentals.RentalsRev(this.rentalsdata, ans);
        chartRevenuesRentals.setClosedRentals(this.rentalsdata);       
      }
       
       } catch(error) {
     // enter your logic for when there is an error (ex. error toast)
          console.log(error)
         } 
    }

}


//classe che gestisce i grafici e le funzioni inerenti al grafico dei noleggi per fatturato
export class RevenuesRentals {
  chart: any = [];
  chart2: any = []
  color = new Colors();
  constructor(private serviceLogic: ServiceLogicService) { }

  getRentalsLabels() {
    let rentals = this.serviceLogic.getRentals();
    let labelsrentals = [];
    if (rentals != null) {
      for (var i = 0; i < rentals.length; i = i + 1) {
        labelsrentals.push(rentals[i].id);
      }
    }
    return labelsrentals;
  }


  RentalsRev(rentals: any, data: any) {
    this.chart = new Chart('canvas_fatturato', {
      type: 'bar',

      data: {
        labels:
          this.getRentalsLabels()
        ,
        datasets: [
          {
            data:  this.settingRentalsData(rentals, data),
            borderColor: '#3e95cd',
            label: 'Rentals done',
            backgroundColor: this.color.settingColors(rentals),

          },
        ],

      },
      options: {
        responsive: false,
        scales: {
          yAxes: {
              title: {
                  display: true,
                  text: 'Revenues for each rental',
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
                  text: 'Rentals',
                  font: {
                      size: 15
                  }
              }
          }
      }
      }
    });
  }

  //funzione che calcola il prezzo per i noleggi 
  settingRentalsData(rentals: any, responsedata: any) {
    let pricerentals = [] as any;
    let tmp = [] as any;
    tmp = responsedata;
        for (var i = 0; i < rentals.length; i = i + 1) {
          pricerentals[i] = 0;
        }
        for (let i = 0; i < rentals.length; i++) {
          pricerentals[i] = pricerentals[i] + tmp[i];        
      }
    return pricerentals;  
    }

    //funzione che imposta il grafico per vedere la situazione dei noleggi conclusi
    setClosedRentals(rentals: any) {
      let labels = ['Paid', 'NeverShowedUp', 'Damaged']
      this.chart2 = new Chart('canvas_closed', {
        type: 'bar',
  
        data: {
          labels:
            labels
          ,
          datasets: [
            {
              data:  this.closedRentals(rentals),
              borderColor: '#3e95cd',
              label: 'Closed rentals',
              backgroundColor: this.color.settingColors(labels),
              barThickness: 50,
  
            },
          ],
  
        },
        options: {
          responsive: false,
          scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Condition for each rental',
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
                    text: 'Number of rentals',
                    font: {
                        size: 15
                    }
                }
            }
        }
      
        }
      });
    }
    closedRentals(rentals: any){
      let closedRentals = {Paid: 0, NeverShowedUp:0, Damaged: 0}
      let currentdate = new Date().toISOString().slice(0, 10);
      console.log('sono date di closed rentals', currentdate)

      for (let i=0; i<rentals.length; i++){
        //se la data odierna è maggiore della data di conclusione, il noleggio è concluso
        if (currentdate > rentals[i].dateEnd){
          //controllo se il noleggio non è pagato - se fosse pagato, il valore sarebbe una data
          if (rentals[i].paid === '0'){
            closedRentals.Paid = closedRentals.Paid + 1
            //controllo se il noleggio è effettivamente partito - cioè se il cliente è venuto a ritirare il bene
          } else if (rentals[i].neverShowedUp === true){
            closedRentals.NeverShowedUp = closedRentals.NeverShowedUp + 1
            //controllo se il prodotto è danneggiato 
          } else if (rentals[i].damagedProduct === true){
            closedRentals.Damaged = closedRentals.Damaged + 1
          }
        }
      }
      return closedRentals;
    }

}
//classi per le funzioni di colore
export class Colors {
  colors: any[] = [];
  constructor() { }
  getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  settingColors(rentals: any) {
    for (var i = 0; i < rentals.length; i = i + 1) {
      this.colors[i] = 0;
    }
    for (var i = 0; i < rentals.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }
    return this.colors;
  }

}

//classe che gestisce i grafici per il periodo di tempo
export class DatesRentals {
  chart: any = [];
  labels: any[] = []; //labels to use in the charts
  color = new Colors();
  constructor() { }

  //funzione che imposta il grafico per vedere i noleggi fatti in un certo mese 
  RentalsPerMonth(rentals: any) {
    this.chart = new Chart('canvas_data', {
      type: 'line',

      data: {
        labels:
          this.getDateLabels(),
        datasets: [
          {
            data: this.settingDatesRentals(rentals),
            borderColor: '#3e95cd',
            label: 'Rentals done',
            backgroundColor: this.color.getRandomRgb(),
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          yAxes: {
              title: {
                  display: true,
                  text: 'Number of rentals',
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
                  text: 'Months',
                  font: {
                      size: 15
                  }
              }
          }
      }
      }
    });
  }




  //funzione che restituisce l'array dei mesi - faccio partire i mesi da 0 - 11
  //0 è il mese di gennaio
  //11 è il mese di dicembre
  getDateLabels() {
      this.labels[0] = "Jan",
      this.labels[1] = "Feb",
      this.labels[2] = "Mar",
      this.labels[3] = "Apr",
      this.labels[4] = "May",
      this.labels[5] = "Jun",
      this.labels[6] = "Jul",
      this.labels[7] = "Aug",
      this.labels[8] = "Sep",
      this.labels[9] = "Oct",
      this.labels[10] = "Nov",
      this.labels[11] = "Dec"

    return this.labels;
  }






  //give a setting to the chart 
  settingDatesRentals(rentalsdata: any) {
    let counters = {} as any;
    var data;
    var datasets;
    let month: any;
    let tmpdate;
    let labelmonths = this.getDateLabels();
    //inizializzazione 
    for (var i = 0; i < labelmonths.length; i = i + 1) {
      counters[labelmonths[i]] = 0;
    }
    for (let i = 0; i < rentalsdata.length; i++) {
      month = rentalsdata[i].dateStart;
      tmpdate = month.split('-');
      if (tmpdate[1] === '01') {
        counters[labelmonths[0]] = counters[labelmonths[0]] + 1;
      }
      if (tmpdate[1] === '02') {
        counters[labelmonths[1]] = counters[labelmonths[1]] + 1;
      }
      if (tmpdate[1] === '03') {
        counters[labelmonths[2]] = counters[labelmonths[2]] + 1;
      }
      if (tmpdate[1] === '04') {
        counters[labelmonths[3]] = counters[labelmonths[3]] + 1;
      }
      if (tmpdate[1] === '05') {
        counters[labelmonths[4]] = counters[labelmonths[4]] + 1;
      }
      if (tmpdate[1] === '06') {
        counters[labelmonths[5]] = counters[labelmonths[5]] + 1;
      }
      if (tmpdate[1] === '07') {
        counters[labelmonths[6]] = counters[labelmonths[6]] + 1;
      }
      if (tmpdate[1] === '08') {
        counters[labelmonths[7]] = counters[labelmonths[7]] + 1;
      }
      if (tmpdate[1] === '09') {
        counters[labelmonths[8]] = counters[labelmonths[8]] + 1;
      }
      if (tmpdate[1] === '10') {
        counters[labelmonths[9]] = counters[labelmonths[9]] + 1;
      }
      if (tmpdate[1] === '11') {
        counters[labelmonths[10]] = counters[labelmonths[10]] + 1;
      }
      if (tmpdate[1] === '12') {
        counters[labelmonths[11]] = counters[labelmonths[11]] + 1;
      }

    }

    return counters;

  }


}