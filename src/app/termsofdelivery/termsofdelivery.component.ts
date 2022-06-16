import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-termsofdelivery',
  templateUrl: './termsofdelivery.component.html',
  styleUrls: ['./termsofdelivery.component.scss']
})
export class TermsofdeliveryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsofdeliveryComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
