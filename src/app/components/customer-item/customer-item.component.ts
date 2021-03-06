import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceLogicService } from 'src/app/services/service-logic.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent implements AfterViewInit {
  rentals = [] as any;
  listing: any;
  tmpdatasource = [] as any;
  tmpcust: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image',  'category', 'product_name', 'starting_date', 'ending_date', 'price', 'condition'];

  constructor(public serviceLogic: ServiceLogicService, public dialog: MatDialog) { }

  ngOnInit():void{
    this.tmpcust = this.serviceLogic.customer_element;
  }
  ngAfterViewInit(): void {

     this.serviceLogic.Loading()
      this.getListing();

  }
  asyncGetRentals = async () => {

    try {
      const response = await fetch('/api/rental/allForCompanies', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
         const data = await response.json();
      // enter you logic when the fetch is successful
      let ans = this.serviceLogic.handle(data);

      if (ans.command === 'displayErr'){
        console.log('Something went wrong')
      } 
      if (typeof ans === 'object'){

        console.log('sono rentals di async', ans)
        let tmp = [] as any;
        tmp = this.arrayRentals(ans);
        return tmp;
      }
       
       } catch(error) {
     // enter your logic for when there is an error (ex. error toast)
          console.log(error)
         } 
    }
    
    
  arrayRentals(rentals: any){
    let tmp = [];
    for (let i=0; i<rentals.length; i++){
      for (let j=0; j<rentals[i].length; j++){
        tmp.push(rentals[i][j])
      }
    }
    return tmp;
  }

  filterCustomerRentals(rentalsdata: any){
    let rents = [] as any;
    let index = 0;
    for (let i=0; i<rentalsdata.length; i++){
        if (rentalsdata[i].customer_id === this.tmpcust._id){
          rents[index] = rentalsdata[i];
          index++;
      }
    }
    return rents;
  }

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
              img: tmpprod.imgs[0],
              name: foundListing.name,
              category: foundListing.type,
              condition: tmpprod.condition,
              starting_date: rentals[i].dateStart,
              ending_date: rentals[i].dateEnd,
              price: this.serviceLogic.truncateByDecimalPlace(responsedata[i], 2)+'$'
            }
            index = index + 1;
        }
      } 
      //significa che non ci sono noleggi fatti dall'utente 
      if (this.tmpdatasource.length === 0){
        console.log(this.tmpdatasource.length, 'forse mettere un messaggio che non ci sono noleggi')


      } else {
        $('#table_rentals_single_customer').css('display', 'block');
        $('#message_customer').css('display', 'none');
        this.dataSource = this.tmpdatasource;
      }
  
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

      this.serviceLogic.stopLoading();
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
        //this.serviceLogic.stopLoading();
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
            this.rentals = await this.asyncGetRentals();
            responsedata = await this.asyncPostCall(this.rentals)
            if (this.filterCustomerRentals(this.rentals).lenght === 0){
              $('#table_rentals_single_customer').css('display', 'none');
              $('#message_customer').css('display', 'block')

            } else{
              this.showRentals(this.filterCustomerRentals(this.rentals), this.listing, responsedata);
            }
          

          }
        }
      }, error => {
        this.serviceLogic.handle(error.responseJSON);
      }
    )
  }

}
