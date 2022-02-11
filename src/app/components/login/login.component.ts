import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component'

declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {

  constructor(private serviceLogic: ServiceLogicService, public dialog: MatDialog) { 
    
  }
  show: boolean = false;

  ngOnInit(): void {

  }

  Login(){
  let ans;
  let data =  $('#logForm').serialize();
  this.serviceLogic.logUser(data).subscribe(res =>{
    ans = this.serviceLogic.handle(res);
    if (ans.command === "displayErr"){
      if (ans.msg === "userNotFound"){
        this.openDialog("User doesn't exist", false);
      }
      if(ans.msg === "wrongPass"){
       // alert("Wrong password");
       this.openDialog("Wrong password", false);
      }
      if(ans.msg === "notAsimpleHWmanUsername"){
        this.openDialog("Use a manager username", false);
      }
      if(ans.msg === "notAManagerUsername"){
        this.openDialog("Use a manager username", false);
      }
    } else {
      if (ans.command === "logErr"){
        console.log(ans.msg);
      }
    }
  },
  err => {
    this.serviceLogic.handle(err.responseJSON)
  }
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


