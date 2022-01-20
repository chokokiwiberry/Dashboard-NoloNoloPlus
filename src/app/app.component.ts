import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  constructor(public serviceLogic: ServiceLogicService) { }
  ngAfterViewInit() {
    let ans;
      this.serviceLogic.getManager().subscribe(res => {
        ans = this.serviceLogic.handle(res);
        if(ans.command === 'displayErr'){
          alert('Your customr account is banned');
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
          console.log(err)
        },
      ) 
  }

  Logout(){
    let ans;
    this.serviceLogic.Logout().subscribe(res =>{
      ans = this.serviceLogic.handle(res);
    });
  }

}
