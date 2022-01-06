import { Component, OnInit, Input } from '@angular/core';

import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-customers-statistics',
  templateUrl: './customers-statistics.component.html',
  styleUrls: ['./customers-statistics.component.css']
})
export class CustomersStatisticsComponent implements OnInit {
  @Input() customersdata!: any[];
  @Input() rentalsdata!: any[];
  chart: any = [];

  chart1: any = [];

  labels: string[] = []; //labels to use in the charts
  counters: number[] = []; //array of counters that counts rentals for each employee

  colors: string[] = [];
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    console.log('sono statistics customersssssssssss');
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
    if (this.customersdata != null) {
      for (var i = 0; i < this.customersdata.length; i = i + 1) {
        this.labels.push(this.customersdata[i].username);
      }
    }
    console.log(this.labels);
    return this.labels;
  }

  //give a setting to the chart 
  settingData() {
    var data;
    var datasets;

    //inizializzazione 
    for (var i = 0; i < this.customersdata.length; i = i + 1) {
      console.log('sono inizliazzazione', i);
      this.counters[i] = 0;
    }
    
    for (var i = 0; i < this.customersdata.length; i = i + 1) {
      for (var j = 0; j < this.customersdata[i].rentals.length; j = j + 1) {
          this.counters[i] = this.counters[i] + 1; //fa un conteggio per quanti noleggi ha un cliente
      }
    }
    
    return this.counters;

  }

  getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  settingColors() {
    for (var i = 0; i < this.customersdata.length; i = i + 1) {
      this.counters[i] = 0;
    }

    for (var i = 0; i < this.customersdata.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }
    console.log('siaiiaiaiaia ', this.colors);
    return this.colors;
  }

}
