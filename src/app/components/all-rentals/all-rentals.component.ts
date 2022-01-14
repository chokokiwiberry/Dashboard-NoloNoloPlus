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

    this.listing = this.serviceLogic.getListing();
    console.log('sono qaaaaaaaaaaaaaaui')

    console.log('sono rental item', this.serviceLogic.employeerentals);
    if (this.serviceLogic.employeerentals != null) {
      console.log('ma is here?');
      if (this.serviceLogic.employeerentals.length > 0) {
        console.log('ma bohhhh');
        this.boolrentals = true;
      }
    } else {
      this.boolrentals = false;
    }

    if (this.boolrentals) {
      //ci sono delle prenotazioni - visualizzarle
      console.log('c è roba da viusalizzare');
      this.showRentals(this.rentals);
    } else {
      //messaggio che non sono presenti
      console.log('messaggio, non ci sono robe da visualizzare');
    }
  }

  //restituisce il listing dell'oggetto rentato
  findListing(rental: any) {
    let obj = this.listing.find(function (element: any) {
      element.id === rental.products[0].listing
    })
    if (obj !== 'undefined') {
      return obj;
    } else {
      return -1;
    }
  }

  showRentals(rentals: any) {
    //oggetto prodotto dal server
    //listing con il prodotto
    //cerco il listing del rental
    let tmprentals = this.rentals;

    let foundListing;




    let index = 0;
    try {
      for (let i = 0; rentals.length; i++) {
        foundListing = this.findListing(rentals[i]);
        console.log('sono qui 0')
        if (foundListing !== -1) {
          console.log('sono qui 1')

          this.tmpdatasource[index] = {
            id_rental: rentals[i].id,
            img: this.transform(foundListing[rentals[i].products[0].product]),
            name: foundListing.name,
            category: foundListing.type,
            condition: foundListing[rentals[i].products[0].product].condition,
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



  //function that cleans the base64 image 
  transform(elementimg: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(elementimg);
  }

}
