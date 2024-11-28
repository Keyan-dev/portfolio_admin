import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout/flex';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [FlexModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class SignInComponent {
  constructor(private router: Router) {
  }

  navigateApp() {
    this.router.navigate(['app/dashboard']);
  }
}
