import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageProperties = {
    isLoading: false
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    console.log("app component called...");
    // this.pageProperties.isLoading = true;
    // this.navigateToHome().then(() => {
    //   this.pageProperties.isLoading = false;
    // })
  }
  async navigateToHome() {
    let userToken = ɵparseCookieValue(document.cookie, '__pa_token');
    if (userToken) {
      console.log(this.activatedRoute.snapshot);
      if (this.activatedRoute?.snapshot?.routeConfig?.path === '') {
        this.router.navigate(['app/dashboard']);
      }
    }
    else {
      this.router.navigate(['signin']);
    }
  }
}
