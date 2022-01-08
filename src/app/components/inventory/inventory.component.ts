import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  //inizializzazione delle variabli

  showstatistics: boolean = false;

  products = [] as any;
  tmpprods = [] as any;
  rentals = [] as any;
  listings = [] as any;

  countersRentals = [] as any; //conta i noleggi per ogni prodotto

  constructor(private serviceLogic: ServiceLogicService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.rentals = this.getRentals();
    this.listings = this.getListing();

    this.products = this.setCards(this.rentals, this.listings);

  }
  showStatistics() {
    this.showstatistics = !this.showstatistics;
  }

  getRentals() {
    return this.serviceLogic.getRentals();
  }

  getListing() {
    return this.serviceLogic.getListing();
  }

  setCards(rentals: any[], listings: any[]) {
    //? - 

    let countRentals: any[][] = [];
    countRentals = this.countRentalsForProducts(this.rentals, this.listings);



    let index = 0;
    let prods = [];
    let tmpfound: any;
    for (let i = 0; i < rentals.length; i = i + 1) {
      for (let j = 0; j < listings.length; j = j + 1) {
        //products[0] perché non sono nel caso bundle
        if (rentals[i].products[0].listing === this.listings[j].id) {
          tmpfound = this.findProduct(listings[j], rentals[i].products[0].product)
          console.log('3')
          if (tmpfound) {
            console.log('4')
            console.log('sisssssss');

            prods[index] = {
              name: listings[j].name,
              category: listings[j].type,
              brand: listings[j].brand,
              img: this.transform(tmpfound.imgs[0]),
              condition: tmpfound.condition,
              nRentals: countRentals[listings[j].id][rentals[i].products[0].product]
            }
            index = index + 1;
          }
        }
      }
    }

    return prods;

  }
  //funzione che ritorna una matrice per memorizzare quanti noleggi sono stati fatti sui prodotti
  countRentalsForProducts(rentals: any[], listings: any[]) {
    // array per contare i rental di un prodotto
    let countRentals: any[][] = [];


    //inizializzazione della matrice
    console.log(listings.length);
    for (let i = 0; i < listings.length; i = i + 1) {
      countRentals[listings[i].id] = [];

      for (let j = 0; j < listings[i].products.length; j = j + 1) {
        console.log('ma qui 1');
        console.log('eeeee', i, j);
        countRentals[listings[i].id][j] = 0;
      }
    }

    //scorro tutti i rentals
    //scorro tutti i listing 

    for (let i = 0; i < rentals.length; i = i + 1) {

      for (let j = 0; j < listings.length; j = j + 1) {

        // non caso bundle
        if (rentals[i].products.length == 1) {
          if (rentals[i].products[0].listing === listings[j].id) {

            if (listings[j].products.length > 0) {

              for (let k = 0; k < listings[j].products.length; k = k + 1) {
                if (rentals[i].products[0].product === k) {

                  //uso una matrice
                  countRentals[listings[j].id][rentals[i].products[0].product] =
                    countRentals[listings[j].id][rentals[i].products[0].product] + 1;
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

  //funzione che restituisce l'oggetto prodotto in base al listing e all'indice prodotto
  findProduct(listings: any, prodid: any) {
    if (listings.products.length > 0) {
      for (let i = 0; i < listings.products.length; i = i + 1) {
        if (i === prodid) {
          return listings.products[i];
        }
      }
    }
    return false;
  }

  //function that return the index
  getIndex(listings: any) {

  }

  setCards1() {
    console.log('set cards()');
    let index = 0;
    //inizializzazione di counterRentals
    for (var i = 0; i < this.tmpprods.length; i = i + 1) {
      this.countersRentals[i] = 0;

    }

    for (var i = 0; i < this.rentals.length; i = i + 1) {
      for (var j = 0; j < this.tmpprods.length; j = j + 1) {
        if (this.rentals[i].products.length == 1) {
          if (this.rentals[i].products[0] == this.tmpprods[j].id) {
            this.countersRentals[this.tmpprods[j].id] = this.countersRentals[this.tmpprods[j].id] + 1;
          }
        }
        for (var k = 0; k < this.listings.length; k = k + 1) {

        }
      }
    }

    for (var i = 0; i < this.tmpprods.length; i = i + 1) {
      for (var j = 0; j < this.listings.length; j = j + 1) {
        if (this.tmpprods[i].listing_id == this.listings[j].id) {
          //creo un vettore temporaneo e uso questo vettore da dare alle cards
          this.products[index] = {
            img: this.transform(this.tmpprods[i].imgs[0]),
            name: this.listings[j].name,
            category: this.listings[j].type,
            condition: this.tmpprods[i].conditions,
            numberRentals: this.countersRentals[this.tmpprods[i].id]
          }

          index = index + 1; //update the index
        }
      }
    }
    console.log('sto setttttttttttttcard', this.products);
    return this.products;

  }

  //function that cleans the base64 image 
  transform(elementimg: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(elementimg);
  }
}
