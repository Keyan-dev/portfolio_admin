import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonAuthService } from 'src/app/services/common-auth.service';
import { CommonSnackbarService } from 'src/app/services/common-snackbar.service';

interface PageProperties {
  buttonLoader: boolean;
  isLoader: boolean;
}

interface UserData {
  name: string;
  token: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  /**
   * Properties to manage the state of the page, such as loading indicators.
   */
  pageProperties: PageProperties = { buttonLoader: false, isLoader: false };

  /**
   * FormGroup to manage the sign-in form controls and validations.
   */
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  /**
   * Constructor to inject necessary services.
   * @param router - Router for navigation.
   * @param authService - CommonAuthService for authentication operations.
   * @param snackBar - CommonSnackbarService for displaying notifications.
   */
  constructor(
    private router: Router,
    private authService: CommonAuthService,
    private snackBar: CommonSnackbarService
  ) {}

  /**
   * Lifecycle hook that is called after the component has initialized.
   */
  ngOnInit(): void {
    console.log('Sign-in component initialized.');
    this.pageProperties.isLoader = false;
    const token = ɵparseCookieValue(document.cookie, '__pa_token');
    console.log('Token details in sign-in:', token);
  }

  /**
   * Handles the login process by calling the authentication service.
   */
  login(): void {
    this.pageProperties.buttonLoader = true;
    this.authService.login(this.signInForm.value).subscribe({
      next: (data: any) => this.loginUser(data),
      error: (err: any) => this.handleLoginError(err),
      complete: () => (this.pageProperties.buttonLoader = false)
    });
  }

  /**
   * Processes the user data upon successful login and navigates to the dashboard.
   * @param data - User data returned from the authentication service.
   */
  private async loginUser(data: UserData): Promise<void> {
    await this.setUserDetails(data);
    this.snackBar.openCustomSnackBar(`Welcome back ${data.name}`, 'close', 'success', 2000, 'center', 'bottom');
    this.router.navigate(['app/dashboard']);
    this.pageProperties.buttonLoader = false;
  }

  /**
   * Handles errors during the login process and displays appropriate messages.
   * @param err - Error object returned from the authentication service.
   */
  private handleLoginError(err: any): void {
    console.error(err);
    this.snackBar.openCustomSnackBar(err.error.error, 'close', 'failed', 2000, 'center', 'bottom');
    this.pageProperties.buttonLoader = false;
  }

  /**
   * Sets the user details in cookies and updates the AuthService with user data.
   * @param userData - User data to be set.
   * @returns A promise that resolves to true when the operation is complete.
   */
  private async setUserDetails(userData: UserData): Promise<boolean> {
    document.cookie = `__pa_token=${userData.token};path=/;secure;samesite=strict;`;
    this.authService.userDetails.next(userData);
    return true;
  }
}
