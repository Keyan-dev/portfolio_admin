import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css'],
  standalone: true,
  imports: [MaterialModule, FlexLayoutModule]
})
export class CommonHeaderComponent implements OnInit {
  @Input() headerDetails!: { heading: string, subHeading: string, buttonName: string, buttonFunction: string, iconName: string };
  @Output() ButtonClickEvent = new EventEmitter();
  constructor() {
    this.headerDetails = { heading: '', subHeading: '', buttonName: '', buttonFunction: '', iconName: 'info' }
  }
  ngOnInit(): void {
    console.log("Header component rendered")
  }
  buttonClicked(): void {
    this.ButtonClickEvent.emit(this.headerDetails?.buttonFunction);
  }
}
