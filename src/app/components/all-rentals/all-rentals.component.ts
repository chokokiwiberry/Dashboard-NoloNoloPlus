import { HttpClient } from '@angular/common/http';
import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-all-rentals',
  templateUrl: './all-rentals.component.html',
  styleUrls: ['./all-rentals.component.css']
})
export class AllRentalsComponent implements OnInit {

  boolrentals: boolean = false; //variabile che controlla se ci sono dei noleggi prenotati
  products!: any;
  imagePath: any;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image', 'id', 'category', 'product_name', 'starting_date', 'ending_date', 'price', 'condition'];

  rentals: any;

  listing: any;

  tmpdatasource = [] as any;
  constructor(public serviceLogic: ServiceLogicService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    //received completed rentals of a single employee
    this.rentals = this.serviceLogic.employeerentals;

    //get listings and products 

     //this.getListing();

    if (this.serviceLogic.employeerentals != null) {
      if (this.serviceLogic.employeerentals.length > 0) {
        // console.log('c e qualcosa che e arrivato ')
        // console.log('voglio vedere cosa arriva', this.serviceLogic.employeerentals)
        this.boolrentals = true;
      }
    } else {
      // console.log('eeehhhhhhhhhhhhhhhhhh no')
      this.boolrentals = false;
    }

    if (this.boolrentals) {
      //ci sono delle prenotazioni - visualizzarle
     // this.showRentals(this.rentals);
     this.getListing();
    } else {
      //messaggio che non sono presenti
      console.log('messaggio, non ci sono robe da visualizzare');
    }
  }

  //restituisce il listing dell'oggetto rentato
   findListing(rental: any, listings : any) {
    console.log('statement 3')
    console.log(200);
    let obj;
    //let tmplisting = this.getListing();
     console.log('sono dentro findlisting e sto provando a stampare listing', this.listing)

    for (var i = 0; i < listings.length; i++) {
       console.log('sono in findlisting')
      if (rental.products[0].listing === listings[i]._id) {
        obj = this.listing[i];
        return obj;
      }
 

    }
    return -1;

  }

  showRentals(rentals: any, listings :any) {
    //oggetto prodotto dal server
    //listing con il prodotto
    //cerco il listing del rental
    console.log('statement 2')
    let tmprentals = this.rentals;

    let foundListing;


    let tmpprod;

    let index = 0;
    try {
      for (let i = 0; rentals.length; i++) {
        foundListing = this.findListing(rentals[i], listings);
        console.log('sono appena stato chiamato e trovato', foundListing)
        console.log('sono qui 0')
        if (foundListing !== -1) {
          tmpprod = foundListing.products[rentals[i].products[0].product];

          this.tmpdatasource[index] = {
            id_rental: rentals[i].id,
            img: this.transform(foundListing[rentals[i].products[0].product]),
            name: foundListing.name,
            category: foundListing.type,
            condition: tmpprod.condition,
            starting_date: rentals[i].dateStart,
            ending_date: rentals[i].dateEnd,
            price: rentals[i].price
          }
          index = index + 1;
        }
        console.log('sono qui 3')

      }
    } catch (error) {
      console.log(error, 'Something bad happened');
    };

    this.dataSource = this.tmpdatasource;
     
  }

  getListing(){
    let ans;
    this.serviceLogic.getListing().subscribe(
      success =>{
       ans = this.serviceLogic.handle(success);
       if (ans.command === 'displayErr'){
        if (ans.msg === 'mustBeLoggedAsSimpleHWMan'){
          alert('Please login to access to data');
        }
        if (ans.msg === 'mustHaveCompanies'){
          alert('Data accessible only to the company members');
        }
       } else{
         if (typeof ans === 'object'){
           console.log('sono qui finalmente e stai funzionando e macarenza prezzemolo');
           console.log(ans, 'sono ans e sto consolando l oggetto ricevuto dal server');
           this.listing = ans;
           this.showRentals(this.rentals, this.listing);

         }
       }
      }, error =>{
        console.log(error);
      }
    )
  }
 

  

  //function that cleans the base64 image 
  transform(elementimg: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(elementimg);
  }

}
