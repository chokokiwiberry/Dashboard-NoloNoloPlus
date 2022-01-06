import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-rentals-statistics',
  templateUrl: './rentals-statistics.component.html',
  styleUrls: ['./rentals-statistics.component.css']
})
export class RentalsStatisticsComponent implements OnInit {
  @Input() rentalsdata!: any[];

  chart: any = [];

  labels: string[] = []; //labels to use in the charts
  counters: number[] = []; //array of counters that count rentals for each employee

  colors: string[] = [];
  constructor() { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
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
            backgroundColor: this.getRandomRgb(),

          },
        ],

      },
      options: {
        responsive: false
      }
    });
  }

  
  getLabels() {
    console.log("labeeeeeeeeeeeeeeeeeeeee");
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
    this.labels[11] = "Dec",


    console.log(this.labels.length);
    console.log(this.labels);
    return this.labels;
  }

  //give a setting to the chart 
  settingData() {
    var data;
    var datasets;

    //inizializzazione 
    for (var i = 0; i < this.rentalsdata.length; i = i + 1) {
      console.log('sono inizliazzazione', i);
      this.counters[i] = 0;
    }
    
   /* for (var i = 0; i < this.rentalsdata.length; i = i + 1) {
        switch (this.rentalsdata[i].dateStart.getMonth() ){
          case  'Jan': 
          this.counters[i] = this.counters[i] + 1;
          case 'Feb' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Mar' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Apr' : 
          this.counters[i] = this.counters[i] + 1;
          case 'May' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Jun' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Jul' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Aug' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Sep' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Oct' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Nov' : 
          this.counters[i] = this.counters[i] + 1;
          case 'Dec' : 
          this.counters[i] = this.counters[i] + 1;

      }
    }
    console.log("sono settindata", this.counters);
    return this.counters;
 */
  }

  getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  settingColors() {
    for (var i = 0; i < this.rentalsdata.length; i = i + 1) {
      this.counters[i] = 0;
    }

    for (var i = 0; i < this.rentalsdata.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }
    console.log('siaiiaiaiaia ', this.colors);
    return this.colors;
  }


}
