import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-company-handler',
  templateUrl: './company-handler.component.html',
  styleUrls: ['./company-handler.component.css']
})
export class CompanyHandlerComponent implements OnInit {

  constructor(private serviceLogic: ServiceLogicService) { }

  ngOnInit(): void {
  }

  Add(){
    let ans;
    let data = $('#add-company').serialize();
    this.serviceLogic.AddCompany(data).subscribe(res =>{
      ans = this.serviceLogic.handle(res);
      if (ans.command === "displayErr"){
        if(ans.msg === "nameFieldEmpty"){
          alert("Please insert a name");
        }
        if(ans.msg === "passwordFieldEmpty"){
          alert("Please insert a code");
        }
        if(ans.msg === "companyNotFound"){
          alert("Company not found");
        }
      }
      if (typeof ans === 'object'){
        //update manager object - and update everything else -rentals, inventory, listing...
        alert("Added the company");
        this.serviceLogic.managerObj = ans;

      }
    },
    err => {
      console.log(err);
      this.serviceLogic.handle(err.responseJSON);
    })
    
  }
  Create(){
    let ans;
    let data =  $('#company-form').serialize();
    this.serviceLogic.CreateCompany(data).subscribe(res =>{
      console.log(res);
      ans = this.serviceLogic.handle(res);
      if (ans.command === "displayErr"){
        if (ans.msg === "nameFieldEmpty"){
          alert("Please insert a name");
        }
        if (ans.msg === "passwordFieldEmpty"){
          alert("Please insert a company code");
        }
        if(ans.msg === "companyNameTaken"){
          alert("Please choose another name");
        }
      }
      if (typeof ans === 'object'){
        //salva oggetto manager e aggiorna i dati della pagina
        alert("Company created");
        console.log('funzia', ans);
      }
    },
    err => {
      console.log(err);
      this.serviceLogic.handle(err.responseJSON);
    })
  }

}
