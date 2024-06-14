import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './auth/auth.module';
import { CommonHeaderComponent } from './common-standlone/common-header/common-header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonLoaderComponent } from './common-standlone/common-loader/common-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    CommonHeaderComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    HttpClientModule,
    CommonLoaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
