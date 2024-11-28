import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroRoutingModule} from './hero-routing.module';
import {HeroListComponent} from './hero-list/hero-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';


@NgModule({
  imports: [
    CommonModule,
    HeroRoutingModule, FlexLayoutModule, MaterialModule,
    HeroListComponent
  ]
})
export class HeroModule {
}
