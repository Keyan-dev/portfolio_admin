import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:true
})
export class AppComponent implements OnInit{
  title = 'portfolio_admin';
  ngOnInit(){
    initFlowbite();
  }
}
