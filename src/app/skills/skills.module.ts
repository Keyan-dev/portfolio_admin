import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills/skills.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonHeaderComponent } from '../common-standlone/common-header/common-header.component';
import { CommonLoaderComponent } from '../common-standlone/common-loader/common-loader.component';



@NgModule({ declarations: [
        SkillsComponent
    ], imports: [CommonModule,
        SkillsRoutingModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule, CommonHeaderComponent, CommonLoaderComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SkillsModule { }

