import {Component, Inject, OnInit} from '@angular/core';
import {DataShareService} from "../../services/data-share.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-last-service-dialogue-component',
  templateUrl: './last-service-dialogue-component.component.html',
  styleUrls: ['./last-service-dialogue-component.component.scss']
})
export class LastServiceDialogueComponentComponent implements OnInit {

  constructor(public  dataShare : DataShareService,  @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<LastServiceDialogueComponentComponent>,) { }

  ngOnInit(): void {
  }


  close(type: number) {
    if (type === 1) {
      this.dataShare.removeProduct(this.data);
      this.dataShare.step.calendar = false;
      this.dataShare.step.order = false;
      this.dataShare.step.service = false;
      this.dataShare.index = 0;
      this.dialogRef.close();
    } else {
      this.dialogRef.close();

    }


  }


}
