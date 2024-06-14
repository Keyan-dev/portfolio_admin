import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonAuthService } from 'src/app/services/common-auth.service';
import { CommonSnackbarService } from 'src/app/services/common-snackbar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  pageProperties = { buttonLoader: false, isLoader: false }
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  constructor(private router: Router,
    private authService: CommonAuthService,
    private snackBar: CommonSnackbarService
  ) {
  }
  ngOnInit() {
    console.log("sign in called...");
    this.pageProperties.isLoader = false;
    console.log("token details in sign in....", ɵparseCookieValue(document.cookie, '__pa_token'));
  }
  login() {
    this.pageProperties.buttonLoader = true;
    this.authService.login(this.signInForm.value).subscribe({
      next: (data: any) => {
        this.loginUser(data);
      },
      error: (err) => {
        this.snackBar.openCustomSnackBar(err.error.error, 'close', 'failed', 2000, 'center', 'bottom');
        this.pageProperties.buttonLoader = false;
      },
      complete: () => {
        this.pageProperties.buttonLoader = false;
      }
    })
  }
  loginUser(data: any) {
    this.setUserDetails(data).then(() => {
      this.snackBar.openCustomSnackBar(`Welcome back ${data.name}`, 'close', 'success', 2000, 'center', 'bottom');
      this.router.navigate(['app/dashboard']);
      this.pageProperties.buttonLoader = false;
    });
  }
  async setUserDetails(userData: any) {
    document.cookie = `__pa_token=${userData?.token};path=/; secure;samesite=strict;`;
    this.authService.userDetails.next(userData);
    return true;
  }
  // async getTokenUserDetails() {
  //   let userToken = ɵparseCookieValue(document.cookie, '__pa_token');
  //   console.log("userToken...", userToken)
  //   if (userToken) {
  //     this.authService.getUserDetails(userToken).subscribe({
  //       next: (data) => {
  //         this.pageProperties.isLoader = false;
  //         this.loginUser(data);
  //       },
  //       error: () => {
  //         this.pageProperties.isLoader = false;
  //         this.snackBar.openCustomSnackBar('Failed to get login user details', 'close', 'failed', 2000, 'center', 'bottom');
  //       }
  //     });
  //     return true;
  //   }
  //   else {
  //     this.pageProperties.isLoader = false;
  //     return true;
  //   }

  // }
}
