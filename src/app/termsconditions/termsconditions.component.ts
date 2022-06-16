import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.component.html',
  styleUrls: ['./termsconditions.component.scss']
})
export class TermsconditionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsconditionsComponent>) { }

  ngOnInit(): void {



  }

  close() {
    this.dialogRef.close();
  }
}
