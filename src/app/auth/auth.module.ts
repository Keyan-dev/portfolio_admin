import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonLoaderComponent } from '../common-standlone/common-loader/common-loader.component';



@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule, FlexLayoutModule, MaterialModule, ReactiveFormsModule, CommonLoaderComponent
  ],
})
export class AuthModule { }
