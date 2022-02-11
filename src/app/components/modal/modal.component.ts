import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
msg: any;
regged: boolean = false;

  //inietto nella componente modale il messaggio che ricevo
  constructor(@Inject (MAT_DIALOG_DATA) public data: any)  { }

  ngOnInit(): void {
    console.log('sono stato ricevuto da mat dialg', this.data);
    this.msg = this.data.msg;
    this.regged = this.data.regged;
  }


}
