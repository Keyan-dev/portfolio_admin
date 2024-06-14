import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { CommonHeaderComponent } from '../common-standlone/common-header/common-header.component';
import { CommonLoaderComponent } from '../common-standlone/common-loader/common-loader.component';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule, MaterialModule, CommonHeaderComponent, CommonLoaderComponent
  ],
  providers: []
})
export class DashboardModule { }
