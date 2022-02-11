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

  myprods = [] as any; // variabile nella quale si salvano i listing appartenenti all'azienda del manager

  provatmp = [] as any;

  //variabili che vengono passate alla componente child
  listingsdata : any;
  rentalsdata: any;


  constructor(private serviceLogic: ServiceLogicService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.rentals = this.getRentals();
    this.serviceLogic.Loading();
    this.getListing();


  }

  //funzione che filtra i listing e mostra solo i listing che appartengono al manager corrente
  showMyProds(listing: any) {
    let tmprod = [] as any;
    let index = 0;
    for (let i = 0; i < listing.length; i = i + 1) {
      for (let j = 0; j < this.serviceLogic.managerObj.companies.length; j = j + 1) {
        if (listing[i].company === this.serviceLogic.managerObj.companies[j]) {
          tmprod[index] = listing[i];
          index = index + 1;
        }
      }
    }
    return tmprod;
  }
  showStatistics() {
    this.showstatistics = !this.showstatistics;
  }

  getRentals() {
    return this.serviceLogic.getRentals();
  }

  getListing() {
    let ans;
    this.serviceLogic.getListing().subscribe(
      success => {
        this.serviceLogic.stopLoading();
        ans = this.serviceLogic.handle(success);
        if (ans.command === 'displayErr') {
          if (ans.msg === 'mustBeLoggedAsSimpleHWMan') {
            alert('Please login to access to data');
          }
          if (ans.msg === 'mustHaveCompanies') {
            alert('Data accessible only to the company members');
          }
        } else {
          if (typeof ans === 'object') {
    
            this.listings = ans;
            this.provatmp = ans;
            this.listingsdata = ans;
            this.rentalsdata = this.serviceLogic.getRentals();
            this.myprods = this.showMyProds(this.listings);
            this.products = this.setCards(this.rentals, this.myprods);


          }
        }
      }, error => {
        this.serviceLogic.handle(error.responseJSON)
      }
    )
  }



  setCards(rentals: any[], listings: any[]) {
    let countRentals: any[][] = [];
    countRentals = this.countRentalsForProducts(this.rentals, this.myprods); //perché mancano i rentals ufficiali e 
    //bisogna aggiustare un po' gli id quindi rimane un po' in sospeso

    //mostrare come immagine il prodotto meno costoso

    //attenzione che nel json ufficiale id è _id

    let index = 0;
    let prods = [];
    let tmpfound: any;
    for (let i = 0; i < rentals.length; i = i + 1) {
      for (let j = 0; j < listings.length; j = j + 1) {
        //products[0] perché non sono nel caso bundle
        if (rentals[i].products[0].listing === this.listings[j]._id) {
          tmpfound = this.findProduct(listings[j], rentals[i].products[0].product)
          if (tmpfound) {
            prods[index] = {
             // idProd: JSON.stringify({listingid: listings[j]._id, productNumber: rentals[i].products[0].product}),
              name: listings[j].name,
              category: listings[j].type,
              brand: listings[j].brand,
              description : listings[j].description,
              img: tmpfound.imgs[0],
              condition: tmpfound.condition,
              nRentals: countRentals[listings[j]._id][rentals[i].products[0].product]
            }
            index = index + 1;
          }
        }
      }
    }

    return prods;

  }

  //funzione che mostra il prodotto più economico
  showCheapestImage(){

  }
  //funzione che ritorna una matrice per memorizzare quanti noleggi sono stati fatti sui prodotti
  countRentalsForProducts(rentals: any[], listings: any[]) {
    // array per contare i rental di un prodotto
    let countRentals: any[][] = [];


    //inizializzazione della matrice
    console.log(listings.length);
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
                if (rentals[i].products[0].product === k) {

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



  //function that cleans the base64 image 
  transform(elementimg: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(elementimg);
  }


}
