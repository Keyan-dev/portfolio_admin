import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule, MaterialModule,
    DashboardComponent
  ]
})
export class DashboardModule {
}
