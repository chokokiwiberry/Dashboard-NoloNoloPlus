
import { Component, OnInit, Input } from '@angular/core';

import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  chart: any = [];

  chart1: any = [];

  @Input() employeesdata!: any[];
  @Input() rentalsdata!: any[];
  



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
    if (this.employeesdata != null) {
      for (var i = 0; i < this.employeesdata.length; i = i + 1) {
        this.labels.push(this.employeesdata[i].username);
      }
    }
    return this.labels;
  }

  //give a setting to the chart 
  settingData() {
    var data;
    var datasets;

    //inizializzazione 
    for (var i = 0; i < this.employeesdata.length; i = i + 1) {
      this.counters[i] = 0;
    }

    for (var i = 0; i < this.employeesdata.length; i = i + 1) {
      for (var j = 0; j < this.rentalsdata.length; j = j + 1) {
        if (this.employeesdata[i].id == this.rentalsdata[j].simpleHWman_id) {
          this.counters[i] = this.counters[i] + 1;
        }
      }
    }
    console.log("sono settindata", this.counters);
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
    for (var i = 0; i < this.employeesdata.length; i = i + 1) {
      this.counters[i] = 0;
    }

    for (var i = 0; i < this.employeesdata.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }
    console.log('siaiiaiaiaia ', this.colors);
    return this.colors;
  }


}
