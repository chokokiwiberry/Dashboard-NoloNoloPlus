import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ServiceLogicService } from 'src/app/services/service-logic.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-all-rentals',
  templateUrl: './all-rentals.component.html',
  styleUrls: ['./all-rentals.component.css']
})
export class AllRentalsComponent implements OnInit, OnDestroy {

  boolrentals: boolean = false; //variabile che controlla se ci sono dei noleggi prenotati
  products!: any;
  imagePath: any;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image', 'id', 'category', 'product_name', 'starting_date', 'ending_date', 'price', 'condition'];

  rentals: any;

  listing: any;

  tmpdatasource = [] as any;
  private ngUnsubscribe = new Subject();
  constructor(public serviceLogic: ServiceLogicService, private _sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit(): void {

    //received completed rentals of a single employee
    this.rentals = this.serviceLogic.employeerentals;

    //get listings and products 

    if (this.serviceLogic.employeerentals != null) {
      if (this.serviceLogic.employeerentals.length > 0) {
        this.boolrentals = true;
      }
    } else {
      this.boolrentals = false;
    }

    if (this.boolrentals) {
      this.serviceLogic.Loading();
      this.getListing();
    } else {
      //messaggio che non sono presenti
      this.openDialog('There are no rentals managed by this employee', false)
      console.log('messaggio, non ci sono robe da visualizzare');
    }
  }

  //restituisce il listing dell'oggetto rentato
  findListing(rental: any, listings: any) {
    let obj : any;
    for (var i = 0; i < listings.length; i++) {
      if (rental.products[0].listing === listings[i]._id) {
        obj = this.listing[i];
        return obj;
      }
    }
    return -1;
  }

  openDialog(msg: any, regged: boolean) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data: { msg: msg, regged: regged },


    });
    dialogRef.afterClosed();

  }


  showRentals(rentals: any, listings: any, responsedata: any) {
    //oggetto prodotto dal server
    //listing con il prodotto
    //cerco il listing del rental
    let tmprentals = this.rentals;
    let foundListing: any;
    let tmpprod: any;
    let index = 0;

    
      for (let i = 0; i< rentals.length; i++) {
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
              price: responsedata[i]
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



  //bisogna fare le get a cascata
  getListing() {
    let ans;
    let responsedata = [] as any;
    let tmpans;
    this.serviceLogic.getListing().subscribe(
      async success => {
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
            this.listing = ans;

            //seconda chiamata 
            responsedata = await this.asyncPostCall(this.rentals)
            this.showRentals(this.rentals, this.listing, responsedata);
            console.log(responsedata, 'sono allrentals e sto facendo chiamate due')

          }
        }
      }, error => {
        this.serviceLogic.handle(error.responseJSON);
      }
    )
  }

  ngOnDestroy() {


  }



  //function that cleans the base64 image 
  transform(elementimg: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(elementimg);
  }

}
