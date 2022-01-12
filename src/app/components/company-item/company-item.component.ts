import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/Company';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
   mycompanies = [] as any;

  @Input() companies!:any[];

  constructor(private serviceLogic: ServiceLogicService) { }

  ngOnInit(): void {

    console.log('sono gnola, di companies', this.companies);
    this.mycompanies = this.showMyCompanies();

  }
  showMyCompanies(){
    let tmpcomp = this.companies;
    var filteredArray  = this.serviceLogic.managerObj.companies.filter(function(array_el){
        return tmpcomp.filter(function(anotherOne_el){
            return anotherOne_el.id == array_el.id;
        }).length !== 0
    });
    return filteredArray;
    
  }


}
