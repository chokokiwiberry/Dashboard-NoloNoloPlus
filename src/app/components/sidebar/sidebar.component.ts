import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public _opened: boolean = false;
  @Output() onShowEmployees = new EventEmitter();
  constructor(private serviceLogic: ServiceLogicService) { }

  ngOnInit(): void {
    
  }
  showEmployees(){
    this.serviceLogic.employee_btn_clicked();
  }
  showCustomers(){
    this.serviceLogic.customer_btn_clicked();
  }
  showInventory(){
    this.serviceLogic.inventory_btn_clicked();
  }
  showRentals(){
    this.serviceLogic.rental_btn_clicked();
  }
  goToBakOffice(){
    console.log("to direct to the backoffice board");
  }
  showAccount(){
    this.serviceLogic.account_btn_clicked();
  }
  Logout(){
    let ans;
    this.serviceLogic.Logout().subscribe(res =>{
      ans = this.serviceLogic.handle(res);
    });
  }

}
