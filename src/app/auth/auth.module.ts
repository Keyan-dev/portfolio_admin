import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MaterialModule, ReactiveFormsModule,
    SignInComponent
  ]
})
export class AuthModule {
}
