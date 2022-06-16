import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-dialogcontent',
  templateUrl: './dialogcontent.component.html',
  styleUrls: ['./dialogcontent.component.scss'],

})
export class DialogcontentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogcontentComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private sanitizer: DomSanitizer) {
    if (data.type === 2) {
      this.data.content = sanitizer.bypassSecurityTrustHtml(this.data.content);
    }
  }

  ngOnInit(): void {
    console.log('I am started', this.data);
  }

  close(){
    this.dialogRef.close();
  }

}
