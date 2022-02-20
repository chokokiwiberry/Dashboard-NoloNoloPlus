import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogicService } from 'src/app/services/service-logic.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  public _opened: boolean = false;
  @Output() onShowEmployees = new EventEmitter();
  constructor(private serviceLogic: ServiceLogicService) { }

  ngAfterViewInit(): void {
    //effetto hover sul button companies
    $("#companies_btn").hover(function () {
      $(this).addClass('btn_sidebar_hover');
      $('#company_icon_img').attr("src", "assets/icons/white/company_white.png");
    },
      function () {
        $(this).removeClass('btn_sidebar_hover');
        $('#company_icon_img').attr("src", "assets/icons/black/company_black.png")
      });

    //effetto hover sul button employees
    $("#employees_btn").hover(function () {
      $(this).addClass('btn_sidebar_hover');
      $('#employees_icon_img').attr("src", "assets/icons/white/employees_white.png");
    },
      function () {
        $(this).removeClass('btn_sidebar_hover');
        $('#employees_icon_img').attr("src", "assets/icons/black/employees_black.png")
      });

    //effetto hover sul button customers
    $("#customers_btn").hover(function () {
      $(this).addClass('btn_sidebar_hover');
      $('#customers_icon_img').attr("src", "assets/icons/white/customer_white.png");
    },
      function () {
        $(this).removeClass('btn_sidebar_hover');
        $('#customers_icon_img').attr("src", "assets/icons/black/customer_black.png")
      });
    //effetto hover sul button inventory
    $("#inventory_btn").hover(function () {
      $(this).addClass('btn_sidebar_hover');
      $('#inventory_icon_img').attr("src", "assets/icons/white/inventory_white.png");
    },
      function () {
        $(this).removeClass('btn_sidebar_hover');
        $('#inventory_icon_img').attr("src", "assets/icons/black/inventory_black.png")
      });
    //effetto hover sul button rentals
    $("#rentals_btn").hover(function () {
      $(this).addClass('btn_sidebar_hover');
      $('#rentals_icon_img').attr("src", "assets/icons/white/rentals_white.png");
    },
      function () {
        $(this).removeClass('btn_sidebar_hover');
        $('#rentals_icon_img').attr("src", "assets/icons/black/rentals_black.png")
      });

    //effetto hover sul button backoffice
    $("#backoffice_btn").hover(function () {
      $(this).addClass('btn_sidebar_hover');
      $('#backoffice_icon_img').attr("src", "assets/icons/white/backoffice_white.png");
    },
      function () {
        $(this).removeClass('btn_sidebar_hover');
        $('#backoffice_icon_img').attr("src", "assets/icons/black/backoffice_black.png")
      });

    //effetto hover sul button logout
    $("#logout_btn").hover(function () {
      $(this).addClass('btn_sidebar_hover');
      $('#logout_icon_img').attr("src", "assets/icons/white/logout_white.png");
    },
      function () {
        $(this).removeClass('btn_sidebar_hover');
        $('#logout_icon_img').attr("src", "assets/icons/black/logout_black.png")
      });


  }

  showEmployees() {
    this.serviceLogic.employee_btn_clicked();
  }
  showCustomers() {
    this.serviceLogic.customer_btn_clicked();
  }
  showInventory() {
    this.serviceLogic.inventory_btn_clicked();
  }
  showRentals() {
    this.serviceLogic.rental_btn_clicked();
  }
  goToBakOffice() {
    window.location.href = '../employee';
  }
  showAccount() {
    this.serviceLogic.account_btn_clicked();
  }
  Logout() {
    let ans;
    this.serviceLogic.Logout().subscribe(res => {
      ans = this.serviceLogic.handle(res);
    });
  }



}
