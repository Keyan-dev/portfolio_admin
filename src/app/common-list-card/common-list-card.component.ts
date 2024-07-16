import { Component,OnInit,Input } from '@angular/core';
interface ListDetatils{
  config:{
    isHasImage:boolean,
    pagination:boolean,
    isCheckBox:boolean,
    headerKey:String[]
  },
  listDataSource:any[];
}
@Component({
  selector: 'app-common-list-card',
  standalone: true,
  imports: [],
  templateUrl: './common-list-card.component.html',
  styleUrl: './common-list-card.component.css'
})

export class CommonListCardComponent implements OnInit{
  @Input() listDetails?:ListDetatils;
  ngOnInit(){
    if(this.listDetails)
      this.listDetails['listDataSource']=[{id:1,title:1}];
  }
}
