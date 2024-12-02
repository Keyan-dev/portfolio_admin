import { Routes } from '@angular/router';
import {CodelabComponent} from './codelab/codelab.component';

export const routes: Routes = [
  {path:'',redirectTo:'app/code-lab',pathMatch:'full'},
  {path:'app/code-lab',component:CodelabComponent},
];
