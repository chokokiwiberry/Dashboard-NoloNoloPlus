import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serviceLogic: ServiceLogicService) { }

  ngOnInit(): void {
  }

  Login(){
  let ans;
  let data =  $('#logForm').serialize();
  this.serviceLogic.logUser(data).subscribe(res =>{
    ans = this.serviceLogic.handle(res);
    if (ans.command === "displayErr"){
      if (ans.msg === "userNotFound"){
        alert("User doesn't exist");
      }
      if(ans.msg === "wrongPass"){
        alert("Wrong password");
      }
      if(ans.msg === "notAsimpleHWmanUsername"){
        alert("Use a manager username");
      }
      if(ans.msg === "notAManagerUsername"){
        alert("Use a manager username");
      }
    }
  },
  err => {
    this.serviceLogic.handle(err.responseJSON)
  }
  )
  }

}
