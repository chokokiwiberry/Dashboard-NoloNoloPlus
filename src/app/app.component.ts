import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { ServiceLogicService } from './services/service-logic.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {


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
          $('#div_logreg').css('display', 'block');
        }
        if (typeof ans === 'object'){
          //show dashboard
          $('#div_dash').css('display', 'block');
          this.serviceLogic.managerObj = ans;
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
