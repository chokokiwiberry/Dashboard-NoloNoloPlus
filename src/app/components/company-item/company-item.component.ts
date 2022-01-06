import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/Company';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  @Input() companies!:Company[];
  constructor() { }

  ngOnInit(): void {
    console.log('sono gnola, di companies', this.companies);
  }

}
