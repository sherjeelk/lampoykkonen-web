import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-faq-component',
  templateUrl: './faq-component.component.html',
  styleUrls: ['./faq-component.component.scss']
})
export class FaqComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FaqComponentComponent>) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();

  }
}
