import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TechnologyListComponent } from './technology-list/technology-list.component';

const routes: Routes = [
    { path: '', component: TechnologyListComponent }
]
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TechnologyRoutingModule { }
