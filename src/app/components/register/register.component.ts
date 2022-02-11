import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceLogicService } from 'src/app/services/service-logic.service';
import { ModalComponent } from '../modal/modal.component';
declare var $ : any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
username: any;
name!: any;
surname: any; 
password: any;
  constructor(public serviceLogic: ServiceLogicService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Register(){
  let ans;
  let data =  $('#regForm').serialize();
  
  this.serviceLogic.registerUser(data).subscribe(res =>{
    ans = this.serviceLogic.handle(res);
    if(ans.command === "displayErr"){
      if (ans.msg === "banned"){
        window.location.href = '../customer/'; //forse da cambiare il percorso
      }
      if (ans.msg === "alreadyLogged"){
        this.openDialog("Log out to create a new account", false)
     
      }
      if(ans.msg === "usernameAlreadyInUse"){
        this.openDialog("Use another username, the one chosen is taken", false)
      }
    }
    if(ans === "regged"){
      this.openDialog("Registration is successful, you can login now", true)
    }
  })
    
  }

  openDialog(msg: any, regged: boolean) {
    const dialogRef  = this.dialog.open(ModalComponent, {
      width: '450px',
      data: {msg: msg, regged: regged},

     
    });
    dialogRef.afterClosed();

  }


}
