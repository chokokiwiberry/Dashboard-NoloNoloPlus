
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  chart: any = [];

  chart1: any = [];

 //employees
 //rentals

 employees: any = [];
 rentals : any = [];



  labels: string[] = []; //labels to use in the charts

  counters: number[] = []; //array of counters that count rentals for each employee

  colors: string[] = [];

  constructor(private serviceLogic: ServiceLogicService) {
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
  getRentals(){
    return  this.serviceLogic.getRentals();
  }
  setData(employees: any) {
    let tmp = [] as any;
    let tmpEmp;
    let index = 0;
    for (let i = 0; i < employees.length; i = i + 1) {
      tmpEmp = this.checkSameCompanies(employees[i], this.serviceLogic.managerObj)
      if (tmpEmp !== -1) {
        tmp[index] = tmpEmp;
        index = index + 1;
      }
    }
    console.log('setData', tmp);
    return tmp;
  }
  getEmployees(){
    return this.serviceLogic.getEmployees();

  }

  checkSameCompanies(employee: any, manager: any) {
    for (let i = 0; i < employee.companies.length; i = i + 1) {
      for (let j = 0; j < manager.companies.length; j = j + 1) {
        if (employee.companies[i] === manager.companies[j]) {
          return employee;
        }
      }
    }
    return -1;
  }

  getLabels() {
    let tmp = this.setData(this.getEmployees());
    if (tmp != null) {
      for (var i = 0; i <tmp.length; i = i + 1) {
        this.labels.push(tmp[i].username);
      }
    }
    return this.labels;
  }

  //give a setting to the chart 
  settingData() {
    var data;
    var datasets;

    let tmp = this.setData(this.getEmployees());
    this.rentals = this.getRentals();

    //inizializzazione 
    for (var i = 0; i < tmp.length; i = i + 1) {
      this.counters[i] = 0;
    }

    for (var i = 0; i < tmp.length; i = i + 1) {
      for (var j = 0; j < this.rentals.length; j = j + 1) {
        if (tmp[i].id == this.rentals[j].simpleHWman_id) {
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
    let tmp = this.setData(this.getEmployees());

    for (var i = 0; i < tmp.length; i = i + 1) {
      this.counters[i] = 0;
    }

    for (var i = 0; i < tmp.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }
    console.log('siaiiaiaiaia ', this.colors);
    return this.colors;
  }


}
