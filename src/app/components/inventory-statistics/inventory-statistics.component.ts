import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-inventory-statistics',
  templateUrl: './inventory-statistics.component.html',
  styleUrls: ['./inventory-statistics.component.css']
})
export class InventoryStatisticsComponent implements OnInit {
rentalsdata!: any[];
listingdata!: any[];


  //fare chiamate get per rentals e listings

  chart: any = [];

  labels: string[] = []; //labels to use in the charts
  counters: number[] = []; //array of counters that count rentals for each employee

  colors: string[] = [];
  products!: any[];

  categories!: any[];

  constructor(private serviceLogic: ServiceLogicService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    
    this.categories = this.serviceLogic.getCategory();
    console.log('sono categeeeeeeeeeeeeeeeeeeory', this.categories);
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
            label: 'Rentals done per category',
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
    if (this.categories != null) {
      for (var i = 0; i < this.categories.length; i = i + 1) {
        this.labels.push(this.categories[i].category);
      }
    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaì', this.labels);
    return this.labels;
  }
settingData(){
  
}
  //give a setting to the chart 
  settingData1() {
    var data;
    var datasets;

    //inizializzazione 
    for (var i = 0; i < this.categories.length; i = i + 1) {
      console.log('sono inizliazzazione', i);
      this.counters[i] = 0;
    }

    //prodotti
    //rentals 
    //


    //per ogni rental 
    //rentls products > 0 
    //per ogni listing 
    //per ogni listing.products 

    //se è uguale 
    //allora conta
       //inizializzazione 
       for (var i = 0; i < this.categories.length; i = i + 1) {
        console.log('sono inizliazzazione', i);
        this.counters[i] = 0;
      }
  
     //else trovare la categoria dei kit
    for (var i=0; i<this.rentalsdata.length; i=i+1){
      for (var j=0; j<this.products.length; j=j+1){
        if (this.rentalsdata[i].products.length == 1){
          if (this.rentalsdata[i].products[0] == this.products[j].id){
            for (var k=0; k<this.listingdata.length; k=k+1){
              if (this.listingdata[k].id == this.products[j].listing_id){
                for (var t=0; t<this.categories.length; t=t+1){
                  if (this.listingdata[k].type == this.categories[t].category){
                    this.counters[k] = this.counters[k]+1;
                  }
                }
              }
            }
          }
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
    for (var i = 0; i < this.listingdata.length; i = i + 1) {
      this.counters[i] = 0;
    }

    for (var i = 0; i < this.listingdata.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }
    console.log('siaiiaiaiaia ', this.colors);
    return this.colors;
  }

}
