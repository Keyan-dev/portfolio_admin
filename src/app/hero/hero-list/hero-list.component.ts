import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout/flex';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  standalone: true,
  imports: [FlexModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class HeroListComponent {

}
