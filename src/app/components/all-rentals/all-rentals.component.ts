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

  completedrentals: boolean = false; //variabile che controlla se ci sono dei noleggi prenotati
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
    this.rentals = this.serviceLogic.pastrentals;

    //get listings and products 

    this.listing = this.serviceLogic.getListing();


    console.log('sono rental item', this.serviceLogic.pastrentals);
    if (this.serviceLogic.pastrentals != null) {
      console.log('ma is here?');
      if (this.serviceLogic.pastrentals.length > 0) {
        console.log('ma bohhhh');
        this.completedrentals = true;
      }
    } else {
      this.completedrentals = false;
    }

    if (this.completedrentals) {
      //ci sono delle prenotazioni - visualizzarle
      console.log('c è roba da viusalizzare');
      this.showRentals(this.rentals);
    } else {
      //messaggio che non sono presenti
      console.log('messaggio, non ci sono robe da visualizzare');
    }
  }

  showRentals(rentals: any) {
    //oggetto prodotto dal server
    //listing con il prodotto
    let index = 0;
    try{
      for (let i = 0; rentals.length; i++) {
        this.tmpdatasource[index] = {
          id_rental: rentals[i].id,
          img: this.transform(rentals[i].products[0].products[0].imgs[0]),
          name: rentals[i].products[0].name,
          category: rentals[i].products[0].type,
          condition: rentals[i].products[0].condition,
          starting_date: rentals[i].dateStart,
          ending_date: rentals[i].dateEnd,
          price: rentals[i].price
        }
        index = index + 1;
    } 
    }catch(error){
      console.log(error, 'Something bad happened');
    };
    
    this.dataSource = this.tmpdatasource;
  }



  //function that cleans the base64 image 
  transform(elementimg: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(elementimg);
  }

}
