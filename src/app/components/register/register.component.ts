import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';
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
  constructor(public serviceLogic: ServiceLogicService, private http: HttpClient) { }

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
        alert("Log out to create a new account");
      }
      if(ans.msg === "usernameAlreadyInUse"){
        alert("Use another username, the one chosen is taken");
      }
    }
    if(ans === "regged"){
      alert("Registration is successful, you can login now");
    }
    console.log('reseee', res);
  })


    
  }


}
