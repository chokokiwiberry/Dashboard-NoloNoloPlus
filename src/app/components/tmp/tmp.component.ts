import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-tmp',
  templateUrl: './tmp.component.html',
  styleUrls: ['./tmp.component.css']
})
export class TmpComponent implements AfterViewInit {
  rentalsdata!: any[];
  listingdata!: any[];



  //fare chiamate get per rentals e listings


  //variabili per poter disegnari i grafici
  chart: any = [];
  chart1: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];

  labels: string[] = []; //labels to use in the charts
  counters: number[] = []; //array of counters that count rentals for each employee

  colors: any[] = [];
  products!: any[];

  categories!: any[];



  //variabili input che vengono ricevute dal genitore
  @Input() listings: any;
  @Input() rentals: any;
  @Input() companyname : any;
  @Output() showCharts= new EventEmitter();

  show: any;

  constructor(private serviceLogic: ServiceLogicService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
      

    let tmplist = this.filterListings(this.companyname, this.listings);
    let tmprent = this.filterRentals(this.companyname, this.rentals);

    if (tmplist.length === 0 || tmprent.length === 0){
      //non carico nulla
      $('#statistics_msg'+this.companyname).css('display', 'block');
      $('#hideshowstats'+this.companyname).css('display', 'none')
      $('#loading_cat_t'+this.companyname).css('display','none')

    } else{
      
      $('#statistics_msg'+this.companyname).css('display', 'none');
      $('#hideshowstats'+this.companyname).css('display', 'none')
      $('#loading_cat_t'+this.companyname).css('display','block')

      this.asyncPostCall(tmprent)
    }
   

 
  }
  //filter listings by the name of the company
  filterListings(name: any, listings: any) {
    let tmp = [];
     for (let i = 0; i < listings.length; i++) {
       if (listings[i].company === name) {
         tmp.push(listings[i]);
       }
     }
     return tmp;
   }
 
 
   //filter rentals by the name of the company
   filterRentals(name: any, rentals: any) {
     let tmp = [];
     for (let i = 0; i < rentals.length; i++) {
       if (rentals[i] !== null){
         for (let j = 0; j < rentals[i].companies.length; j++) {
           if (name === rentals[i].companies[j]) {
             tmp.push(rentals[i])
           }
         }
       }
    
     }
     return tmp;
   }
 
   //funzione che serve per creare l'array dei rental da mandare per fare la post dei calcolo dei rental
   postRentalData(name: any, rentals: any) {
     let tmp = [];
     
     for (let i = 0; i < rentals.length; i++) {      
         for (let j = 0; j < rentals[i].companies.length; j++) {
           if (name === rentals[i].companies[j]) {
             tmp[i] = { priceObj: rentals[i].price[0], dateStart: rentals[i].dateStart, dateEnd: rentals[i].dateEnd }
           }
         }
       }
     return tmp;
 
   }

  asyncPostCall = async (rentals: any) => {

    let chartCategoryN = new CategoryProds(this.filterListings(this.companyname,this.listings), this.filterRentals(this.companyname, this.rentals), this.companyname);
    let chartProds = new Prods(this.filterListings(this.companyname,this.listings), this.filterRentals(this.companyname, this.rentals), this.companyname);
 
    let pstdata = [] as any;
    for (let i = 0; i<rentals.length; i++){
       pstdata[i] = {priceObj: rentals[i].price[0], dateStart :rentals[i].dateStart, dateEnd:rentals[i].dateEnd}
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

      $('#statistics_msg'+this.companyname).css('display', 'none');
      $('#hideshowstats'+this.companyname).css('display', 'block')
      $('#loading_cat_t'+this.companyname).css('display','none')
      let ans = this.serviceLogic.handle(data);

      if (ans.command === 'displayErr'){
        console.log('Something went wrong')
      } 
      if (typeof ans === 'object'){
      chartCategoryN.setChart_rentals(); //imposta il grafico per numero noleggi per categoria
      chartCategoryN.setChart_revenues(ans); //imposta il grafico per fatturato per categoria

      chartProds.setChart_numProds(); //imposta il grafico per numero noleggi per prodotti
      chartProds.setChart_prodRev(ans); //imposta il grafico per fatturato per prodotti
      chartProds.setChart_conditions();
      //chartProds.productConditions();

      }
       
       } catch(error) {
     // enter your logic for when there is an error (ex. error toast)
          console.log(error)
         } 
    }

}

export class Colors {
  colors = [] as any;
  constructor() {}

   /*
   funzioni che generano i colori per i grafici
  */

   getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  settingColors(arraylen: any) {
    for (var i = 0; i < arraylen.length; i = i + 1) {
      this.colors[i] = 0;
    }

    for (var i = 0; i < arraylen.length; i = i + 1) {
      this.colors[i] = this.getRandomRgb();
    }

    return this.colors;
  }

}


//classe che gestisce le funzioni per i grafici - CATEGORIA DI PRODOTTO
//per avere un prospetto di noleggi per categoria
//per avere un prospetto di fatturato per categoria
export class CategoryProds {
  chart: any = [];
  chart1: any = [];
  listings: any = [];
  rentals: any = [];
  name: any;
  colors = new Colors();
  constructor(listings: any, rentals: any, name: any) {
    this.listings = listings;
    this.rentals = rentals;
    this.name = name
  }

   //filter listings by the name of the company
   filterListings(name: any, listings: any) {
    let tmp = [];
     for (let i = 0; i < listings.length; i++) {
       if (listings[i].company === name) {
         tmp.push(listings[i]);
       }
     }
     return tmp;
   }
 
 
   //filter rentals by the name of the company
   filterRentals(name: any, rentals: any) {
     let tmp = [];
     for (let i = 0; i < rentals.length; i++) {
       if (rentals[i] !== null){
         for (let j = 0; j < rentals[i].companies.length; j++) {
           if (name === rentals[i].companies[j]) {
             tmp.push(rentals[i])
           }
         }
       }
    
     }
     return tmp;
   }

  
  //funzione che imposta il grafico per vedere quale categoria viene noleggiata di più
  setChart_rentals() {

    this.chart1 = new Chart('canvas_inventory_rental'+this.name, {
      type: 'bar',

      data: {
        labels:
          this.getLabels(this.filterListings(this.name, this.listings)),
        datasets: [
          {
            data: this.numberOfRentals(),

            borderColor: '#3e95cd',
            label: 'Rentals done',
            backgroundColor: this.colors.settingColors(this.filterListings(this.name, this.listings)),

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
            text: "Number of rentals for each category",
            position: 'top',
            display: true
          }
        },
        maintainAspectRatio: false,
        
        scales: {
          yAxes: {
              title: {
                  display: true,
                  text: 'Number for each category',
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
                  text: 'Category',
                  font: {
                      size: 15
                  }
              }
          }
      }

      }
    });
  }


  //funzione che imposta il grafico per vedere quale categoria dà più fatturato
  setChart_revenues(responsedata: any) {
    this.chart = new Chart('canvas_inventory'+this.name, {
      type: 'bar',

      data: {
        labels:
          this.getLabels(this.filterListings(this.name, this.listings)),
        datasets: [
          {
            data: this.calcRevenues(responsedata),
            borderColor: '#3e95cd',
            label: 'Rentals done',
            backgroundColor: this.colors.settingColors(this.filterListings(this.name, this.listings)),

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
            text: "Revenues for each category",
            position: 'top',
            display: true
          }
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: {
              title: {
                  display: true,
                  text: 'Revenues for each category',
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
                  text: 'Category',
                  font: {
                      size: 15
                  }
              }
          }
      }


      }
    });
  }
   //funzione che calcola quale categoria è quella più noleggiata
   numberOfRentals() {
    let result = {} as any;
    let labels = this.getLabels(this.filterListings(this.name, this.listings));
    let listings = this.filterListings(this.name, this.listings);
    let rentals = this.filterRentals(this.name, this.rentals)

    //inizializzazione
    for (let i = 0; i < labels.length; i++) {
      result[labels[i]] = 0;
    }
    for (let i = 0; i < rentals.length; i++) {
      for (let j = 0; j < listings.length; j++) {
        //non nel caso bundle
        for (let k = 0; k < labels.length; k++) {
          if (rentals[i].products.length === 1) {
            if (rentals[i].products[0].listing === listings[j]._id) {
              if (labels[k] === listings[j].type) {
                result[labels[k]] = result[labels[k]] + 1;
              }
            }
          }
        }
      }
    }

    return result;

  }


    //funzione che restituisce le etichette delle categorie dei listing
    getLabels(listings: any) {
      let labels: any[] = [];
      let tmp = [];
      for (let i = 0; i < listings.length; i++) {
        tmp[i] = listings[i].type;
      }
      labels = [...new Set(tmp)]; //per rimuovere gli elementi doppioni dall'array
      return labels;
    }
  
      //funzione che calcola il fatturato per ogni categoria
  calcRevenues(responsedata : any) {
    let result = {} as any;
    let labels = this.getLabels(this.filterListings(this.name, this.listings));
    let listings = this.filterListings(this.name, this.listings);
    let rentals = this.filterRentals(this.name, this.rentals);
    let tmp = [];
    tmp = responsedata;
        //inizializzazione
        for (let i = 0; i < labels.length; i++) {
          result[labels[i]] = 0;
        }
        for (let i = 0; i < rentals.length; i++) {
          for (let j = 0; j < listings.length; j++) {
            //non nel caso bundle
            for (let k = 0; k < labels.length; k++) {
              if (rentals[i].products.length === 1) {
                if (rentals[i].products[0].listing === listings[j]._id) {
                  if (labels[k] === listings[j].type) {
                    //  tmp = await this.serviceLogic.calculatePrice(this.rentals[i])
                    result[labels[k]] = result[labels[k]] + tmp[i]
                  }
                }
              }
            }
          }
        }

        return result;
  }

}


//classe che gestisce le funzioni per i grafici - PRODOTTI
//per avere un prospetto di noleggi per ogni prodotto - 
//per avere un prospetto di fatturato per ogni prodotto
export class Prods{
  colors = new Colors();
  listings = [] as any;
  rentals = [] as any;

  chart2: any = [];
  chart3: any = [];
  chart4: any = []
  name: any;


   //filter listings by the name of the company
   filterListings(name: any, listings: any) {
    let tmp = [];
     for (let i = 0; i < listings.length; i++) {
       if (listings[i].company === name) {
         tmp.push(listings[i]);
       }
     }
     return tmp;
   }
 
 
   //filter rentals by the name of the company
   filterRentals(name: any, rentals: any) {
     let tmp = [];
     for (let i = 0; i < rentals.length; i++) {
       if (rentals[i] !== null){
         for (let j = 0; j < rentals[i].companies.length; j++) {
           if (name === rentals[i].companies[j]) {
             tmp.push(rentals[i])
           }
         }
       }
    
     }
     return tmp;
   }
  constructor(listings: any, rentals: any, name: any){
    this.listings = listings;
    this.rentals = rentals;
    this.name = name;
  }
    //funzione che imposta il grafico per avere un prospetto del numero dei noleggi per i prodotti
    setChart_numProds() {
      this.chart3 = new Chart('canvas_inventory_prods_number'+this.name, {
        type: 'polarArea',
        data: {
          labels:
            this.getLabelsObj(this.numberRentalsForEachProd()),
          datasets: [
            {
              data: this.getValuesObj(this.numberRentalsForEachProd()),
              borderColor: '#3e95cd',
              label: 'Rentals done',
              backgroundColor: this.colors.settingColors(this.numberRentalsForEachProd()),
  
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
        
          },
          maintainAspectRatio: false,
          
  
  
        }
      });
  
    }
    //funzione che imposta il grafico per vedere quale prodotto noleggia di più e dà più fatturato
    setChart_prodRev(responsedata: any) {
      let tmparray = this.calcProdsRevenues(responsedata)
      this.chart2 = new Chart('canvas_inventory_prods'+this.name, {
        type: 'pie',
        data: {
          labels:
            this.getLabelsObj(tmparray),
          datasets: [
            {
              data: this.getValuesObj(tmparray),
              borderColor: '#3e95cd',
              label: 'Rentals done',
              backgroundColor: this.colors.settingColors(tmparray),
  
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
         
          },
          maintainAspectRatio: false,
  
  
        }
      });
  
    }

    setChart_conditions() {
      let labelscond =  ['New', 'Good', 'Decent', 'Damaged']

      this.chart4 = new Chart('canvas_inventory_prods_conditions'+this.name, {
        type: 'bar',
  
        data: {
          labels:
           labelscond,
          datasets: [
            {
              data: this.productConditions(),
              borderColor: '#3e95cd',
              label: 'Number of products for each condition',
              backgroundColor: this.colors.settingColors(this.productConditions()),

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
              text: "Condition for each product",
              position: 'top',
              display: true
            }
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Condition for each product',
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
                    text: 'Conditions',
                    font: {
                        size: 15
                    }
                }
            }
        }
  
      }
    });
    
  }
        

      //funzione che dato l'oggetto matrice, restituisce l'array asse x
  getLabelsObj(array: any) {
    var labels = array.map((x: { xAxes: any; }) => x.xAxes)
    let tmp = [];
    for (let i = 0; i < labels.length; i++) {
      tmp[i] = JSON.stringify(labels[i]);
    }
    return tmp;
  }

  //funzione che dato l'oggetto matrice, restituisce l'asse y
  getValuesObj(array: any) {
    var values = array.map((x: { yAxes: any; }) => x.yAxes)
    return values;

  }

  //funzione che vede la condizione dei prodotti
  productConditions(){
    let listings = this.filterListings(this.name, this.listings);
    let countConditions = {New: 0, Good:0, Decent: 0, Damaged: 0} as any;


    for (let i=0; i<listings.length; i++){
      for (let j=0; j< listings[i].products.length; j++){
        if (listings[i].products[j].condition === "New"){
          countConditions.New = countConditions.New + 1;
        }
        else if (listings[i].products[j].condition === "Good"){
          countConditions.Good = countConditions.Good + 1;
        }
        else if (listings[i].products[j].condition === "Decent"){
          countConditions.Decent = countConditions.Decent + 1;
        }
        else if (listings[i].products[j].condition === "Damaged"){
          countConditions.Damaged = countConditions.Damaged + 1;
        }
      }
    }

    return countConditions;

  }
  
  /*funzione che conta quanti e quali prodotti sono stati noleggiati:
    -dato che il prodotto è identificaibile univocamente tramite listing_id e posizione nell'array prods
    -si crea un oggetto countRentals che memorizza l'indice del listing, la posizione nell'array e il numero di noleggi fatti
    
    -countRentals =  {
      xAxes = {
        xAxesListings : string
        xAxesProducts : number
      },
      yAxes = number
    }

  */

    numberRentalsForEachProd() {
      let countRentals = {} as any;
      let counts = this.countRentals();
      let index = 0;

      let rentals = this.filterRentals(this.name, this.rentals);
      let listings = this.filterListings(this.name, this.listings);
      //inizializzazione della matrice
      for (let i = 0; i < listings.length; i = i + 1) {
        countRentals[listings[i]._id] = [];
        for (let j = 0; j < listings[i].products.length; j = j + 1) {
          countRentals[listings[i]._id][j] = 0;
        }
      }
  
      for (let i = 0; i < listings.length; i++) {
        for (let j = 0; j < listings[i].products.length; j++)
          for (let k = 0; k < rentals.length; k++) {
            //non nel caso bundle
            if (rentals[k].products.length === 1) {
              if (rentals[k].products[0].listing === listings[i]._id && rentals[k].products[0].product === j) {
                countRentals[listings[i]._id][j] =
                {
                  xAxes: {
                    Listings: listings[i]._id,
                    Products: j,
                  },
                  yAxes: counts[listings[i]._id][j]
                }
              }
            }
          }
      }
  
      //filtro l'array costruito in modo d'avere un array di oggetti che contiene le label dei prodotti noleggiati
      var tmp = [] as any;
      var finalres = [] as any;
      tmp = Object.values(countRentals);
      for (let i = 0; i < tmp.length; i++) {
        for (let j = 0; j < tmp[i].length; j++) {
          if (typeof tmp[i][j] === 'object') {
            finalres[index] = tmp[i][j]
            index++;
          }
        }
      }
      return finalres;
    }
  
      //numero di noleggi per ogni prodotto
  countRentals() {
    let countRentals = {} as any;
    //inizializzazione della matrice

    let rentals = this.filterRentals(this.name, this.rentals);
    let listings = this.filterListings(this.name, this.listings);

    for (let i = 0; i < listings.length; i = i + 1) {
      countRentals[listings[i]._id] = [];

      for (let j = 0; j < listings[i].products.length; j = j + 1) {
        countRentals[listings[i]._id][j] = 0;
      }
    }

    //scorro tutti i rentals
    //scorro tutti i listing 

    for (let i = 0; i < rentals.length; i = i + 1) {

      for (let j = 0; j < listings.length; j = j + 1) {

        // non caso bundle
        if (rentals[i].products.length === 1) {
          if (rentals[i].products[0].listing === listings[j]._id) {

            if (listings[j].products.length > 0) {

              for (let k = 0; k < listings[j].products.length; k = k + 1) {
                if (this.rentals[i].products[0].product === k) {

                  //uso una matrice
                  countRentals[listings[j]._id][rentals[i].products[0].product] =
                    countRentals[listings[j]._id][rentals[i].products[0].product] + 1;
                }
              }
            } else {
              console.log('Error setCards something went wrong');
            }
          }
        }
      }
    }
    return countRentals;

  }
    //funzione che calcola il fatturato dei prodotti - array che viene dato alla chart
    calcProdsRevenues(responsedata: any) {
      let countRentals = {} as any;
      let counts  = {} as any;
      counts = this.calculateRentals(responsedata);
      let index = 0;

      let rentals = this.filterRentals(this.name, this.rentals);
      let listings = this.filterListings(this.name, this.listings);

      //inizializzazione della matrice
      for (let i = 0; i < listings.length; i = i + 1) {
        countRentals[listings[i]._id] = [];
        for (let j = 0; j < listings[i].products.length; j = j + 1) {
          countRentals[listings[i]._id][j] = 0;
        }
      }
  
      for (let i = 0; i < listings.length; i++) {
        for (let j = 0; j < listings[i].products.length; j++)
          for (let k = 0; k < rentals.length; k++) {
            //non nel caso bundle
            if (rentals[k].products.length === 1) {
              if (rentals[k].products[0].listing === listings[i]._id && rentals[k].products[0].product === j) {
                countRentals[listings[i]._id][j] =
                {
                  xAxes: {
                    Listings: listings[i]._id,
                    Products: j,
                  },
                  yAxes: counts[listings[i]._id][j]
                }
              }
            }
          }
      }

      
  
      //filtro l'array costruito in modo d'avere un array di oggetti che contiene le label dei prodotti noleggiati
      var tmp = [] as any;
      var finalres = [] as any;
      tmp = Object.values(countRentals);
      for (let i = 0; i < tmp.length; i++) {
        for (let j = 0; j < tmp[i].length; j++) {
          if (typeof tmp[i][j] === 'object') {
            finalres[index] = tmp[i][j]
            index++;
          }
        }
      }
      return finalres;
  
    }

     calculateRentals(responsedata: any) {
      let countRentals = {} as any;
      let tmp = [] as any;
      let ans;
      tmp = responsedata;
      let rentals = this.filterRentals(this.name, this.rentals);
      let listings = this.filterListings(this.name, this.listings);
   
          //inizializzazione della matrice
  
          for (let i = 0; i < listings.length; i = i + 1) {
            countRentals[listings[i]._id] = [];
  
            for (let j = 0; j < listings[i].products.length; j = j + 1) {
              countRentals[listings[i]._id][j] = 0;
            }
          }
  
          //scorro tutti i rentals
          //scorro tutti i listing 
  
          for (let i = 0; i < rentals.length; i = i + 1) {
  
            for (let j = 0; j < listings.length; j = j + 1) {
  
              // non caso bundle
              if (rentals[i].products.length === 1) {
                if (rentals[i].products[0].listing === listings[j]._id) {
  
                  if (listings[j].products.length > 0) {
  
                    for (let k = 0; k < listings[j].products.length; k = k + 1) {
                      if (this.rentals[i].products[0].product === k) {
  
                        //  tmp = await this.serviceLogic.calculatePrice(this.rentals[i])
  
                        //uso una matrice
                        countRentals[listings[j]._id][rentals[i].products[0].product] =
                          countRentals[listings[j]._id][rentals[i].products[0].product] + tmp[i];
                      }
                    }
                  } else {
                    console.log('Error setCards something went wrong');
                  }
                }
              }
            }
          }
          return countRentals;
    }

}