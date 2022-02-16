import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  showstatistics: boolean = false;
  constructor(private serviceLogic: ServiceLogicService, private _sanitizer: DomSanitizer) { }


  boolrentals: boolean = false; //variabile che controlla se ci sono dei noleggi prenotati
  products!: any;
  imagePath: any;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image', 'id', 'category', 'product_name', 'starting_date', 'ending_date', 'price', 'condition', 'rejected', 'closed', 'paid', 'damagedProduct'];

  rentals: any;

  listing: any;

  tmpdatasource = [] as any;

  rentalsinput = [] as any;


  //da ricordare --> devo fare multiple get e quindi multiple successe e quindi gestire quei casi 
  ngOnInit(): void {

    //received completed rentals of a single employee
    this.rentals = this.getRentals();

    //get listings and products 

    this.serviceLogic.Loading();
    this.getListing();
    

  
  }
  showStatistics() {
    this.showstatistics = !this.showstatistics;
  }
  //restituisce il listing dell'oggetto rentato
  findListing(rental: any, listings: any) {
    let obj;
    for (var i = 0; i < listings.length; i++) {
      if (rental.products[0].listing === listings[i]._id) {
        obj = listings[i];
        return obj;
      }
    }
    return -1;

  }

  showRentals(rentals: any, listings: any, responsedata: any) {
    //oggetto prodotto dal server
    //listing con il prodotto
    //cerco il listing del rental
    let tmprentals = this.rentals;

    let foundListing;


    let tmpprod;

    let index = 0;
      for (let i = 0; i<rentals.length; i++) {

        foundListing = this.findListing(rentals[i], listings);
        if (foundListing !== -1) {

          tmpprod = foundListing.products[rentals[i].products[0].product];
        

            this.tmpdatasource[index] = {
              id_rental: rentals[i].id,
              img: tmpprod.imgs[0],
              name: foundListing.name,
              category: foundListing.type,
              condition: tmpprod.condition,
              starting_date: rentals[i].dateStart,
              ending_date: rentals[i].dateEnd,
              price: responsedata[i]+'$',
              rejected: rentals[i].rejected,
              closed: rentals[i].closed,
              paid: rentals[i].paid,
              damagedProduct: rentals[i].damagedProduct
            }
            index = index + 1;
         
          
         
        }
      }
    this.dataSource = this.tmpdatasource;
  }

  asyncPostCall = async (rentals: any) => {
    let pstdata = [] as any;
    for (let i = 0; i < rentals.length; i++) {
      pstdata[i] = { priceObj: rentals[i].price[0], dateStart: rentals[i].dateStart, dateEnd: rentals[i].dateEnd }
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
      // this.serviceLogic.stopLoadingRentals();
      let ans = this.serviceLogic.handle(data);
      if (ans.command === 'displayErr') {
        console.log('Something went wrong')
      }
      if (typeof ans === 'object') {
        return ans;
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    }
  }

  //function that cleans the base64 image 
  transform(elementimg: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(elementimg);
  }
  getRentals(){
    return this.serviceLogic.getRentals();
  }
  getListing() {
    let ans;
    let responsedata = [] as any;
    this.serviceLogic.getListing().subscribe(
    async   success => {
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
            console.log('sono qui finalmente e stai funzionando e macarenza prezzemolo');
            console.log(ans, 'sono ans e sto consolando l oggetto ricevuto dal server');
            this.listing = ans;
            this.rentalsinput = this.getRentals();

            
            responsedata = await this.asyncPostCall(this.rentals)
            this.showRentals(this.rentals, this.listing, responsedata);
            

          }
        }
      }, error => {
        this.serviceLogic.handle(error.responseJSON)
      }
    )
  }


}




