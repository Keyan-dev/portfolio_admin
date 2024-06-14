import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TechnologyListComponent } from './technology-list/technology-list.component';
import { TechnologyRoutingModule } from './technology-routing.module';
import { CommonHeaderComponent } from '../common-standlone/common-header/common-header.component';
import { CommonLoaderComponent } from '../common-standlone/common-loader/common-loader.component';

@NgModule({
    declarations: [
        TechnologyListComponent
    ],
    imports: [
        CommonModule,
        TechnologyRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonHeaderComponent,
        CommonLoaderComponent
    ]
})
export class TechnologyModule { }

