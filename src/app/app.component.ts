import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { ServiceLogicService } from './services/service-logic.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  title = 'dashboard';
  manager!: any;
  isLogged: boolean = false;
  notLogged: boolean = false;

  constructor(public serviceLogic: ServiceLogicService, public dialog: MatDialog) { }
  ngAfterViewInit() {
    this.serviceLogic.Loading();
    let ans;
      this.serviceLogic.getManager().subscribe(success => {
        this.serviceLogic.stopLoading();
        ans = this.serviceLogic.handle(success);
        if(ans.command === 'displayErr'){
          this.openDialog('Your customr account is banned', false)
          window.location.href = '../customer/'; //forse da cambiare il percorso
        }
        if(ans === 'notLogged'){
          //login/register
          console.log('non sei loggato');
          $('#div_logreg').css('display', 'block');
        }
        if (typeof ans === 'object'){
          //show dashboard
          $('#div_dash').css('display', 'block');
          this.serviceLogic.managerObj = ans;
          console.log('sei loggato');
          console.log(this.serviceLogic.managerObj, 'sono oggetto man obj dopo tutto')
        }
      },
        err => {
          this.serviceLogic.handle(err.responseJSON)
        },
      ) 
  }


  openDialog(msg: any, regged: boolean) {
    const dialogRef  = this.dialog.open(ModalComponent, {
      width: '450px',
      data: {msg: msg, regged: regged},

     
    });
    dialogRef.afterClosed();

  }



  

}
