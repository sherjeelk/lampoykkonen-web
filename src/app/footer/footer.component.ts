import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TermsofdeliveryComponent} from "../termsofdelivery/termsofdelivery.component";
import {TermsconditionsComponent} from "../termsconditions/termsconditions.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private item: any;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    const ref = this.dialog.open(TermsofdeliveryComponent, {
      width: '1000px',
      height: '75vh'
    });
  }

  openTerms() {
    const ref = this.dialog.open(TermsconditionsComponent, {
      width: '1000px',
      height: '75vh'
    });  }
}
