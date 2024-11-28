import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsRoutingModule} from './skills-routing.module';
import {SkillsComponent} from './skills/skills.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SkillsRoutingModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule,
    SkillsComponent
  ]
})
export class SkillsModule {
}

