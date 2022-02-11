import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http'
import {MatSidenavModule} from '@angular/material/sidenav';

//I keep the new line
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogoComponent } from './components/logo/logo.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';

import { RentalsComponent } from './components/rentals/rentals.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { EmployeeItemComponent } from './components/employee-item/employee-item.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { RouterModule, Routes } from '@angular/router';
import { RentalItemComponent } from './components/rental-item/rental-item.component';


import { CustomersStatisticsComponent } from './components/customers-statistics/customers-statistics.component';
import { InventoryStatisticsComponent } from './components/inventory-statistics/inventory-statistics.component';
import { RentalsStatisticsComponent } from './components/rentals-statistics/rentals-statistics.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CompanyHandlerComponent } from './components/company-handler/company-handler.component';
import { AllRentalsComponent } from './components/all-rentals/all-rentals.component';
import { ModalComponent } from './components/modal/modal.component';
import { CustomerItemComponent } from './components/customer-item/customer-item.component';



const appRoutes: Routes = [
  { path: 'employee', component: EmployeeItemComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    SidebarComponent,
    LogoComponent,
    CustomersComponent,
    DashboardContainerComponent,
    RentalsComponent,
    InventoryComponent,
    StatisticsComponent,
    EmployeeItemComponent,
    CompanyItemComponent,
    RentalItemComponent,
    CustomersStatisticsComponent,
    InventoryStatisticsComponent,
    RentalsStatisticsComponent,
    LoginComponent,
    RegisterComponent,
    CompanyHandlerComponent,
    AllRentalsComponent,
    ModalComponent,
    CustomerItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    
 
   
  ],

  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {
}
