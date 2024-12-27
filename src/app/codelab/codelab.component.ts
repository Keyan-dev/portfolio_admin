import { GraphqlService } from './../graphql/graphql.service';
import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApolloQueryResult, gql} from '@apollo/client/core';
import { CodeLab, Users } from '../models';
import { PaginatorComponent } from "../paginator/paginator.component";
@Component({
  selector: 'app-codelab',
  imports: [FormsModule, ReactiveFormsModule, PaginatorComponent],
  templateUrl: './codelab.component.html',
  styleUrl: './codelab.component.scss',
  providers:[GraphqlService],
  standalone:true
})
export class CodelabComponent implements OnInit {
  userId:string|null = null;
  totalCount=signal<number>(0);
  codeLabs=signal<CodeLab[]>([])
  codeLabForm:FormGroup;
  users=signal<Users[] | null>([]);
  toastHandler=signal<boolean>(false);
  constructor(
      private graphQl:GraphqlService,
      formBuilder: FormBuilder
    ) {
      this.codeLabForm = formBuilder.group({
        name: ['', Validators.required],
        imageUrl: ['', Validators.required],
        liveUrl: [''],
        description: ['', Validators.required],
        userId: ['', Validators.required],
      })
  }
  ngOnInit() {
      this.getAllUsers()
  }
  getAllUsers(){
      this.graphQl.getAllUserDetails()
      .valueChanges.subscribe((result:ApolloQueryResult<any>) => {
        this.users.set(result.data.users);
        this.userId=result?.data?.users[0]?.id;
        this.codeLabForm.get('userId')?.setValue(this.userId);
        this.getuserCodeLab();
      });
  }
  getuserCodeLab(limit?:number,page?:number){
    if(this.userId){
      console.log("function called...");
      this.graphQl.getUserCodeLab(this.userId,limit && page ?{limit,page}:{limit:5,page:1})
      .valueChanges.subscribe((result:ApolloQueryResult<any>) => {
        this.codeLabs.set(result.data.user.codelabs.data);
        this.totalCount.set(result.data.user.codelabs.totalCount);
      });
    }
  }
  addCodeLab():void{
    console.log(this.codeLabForm.value)
    this.graphQl.createCodeLab(this.codeLabForm?.value).subscribe(({data})=>{
      // alert(`successfully added...${JSON.stringify(data)}`);
      this.showToastHandler();
      this.codeLabForm.get('useId')?.setValue(this.userId);
      this.codeLabForm.reset();
      this.getuserCodeLab();
    },(err)=>{
      alert(`Error Received${err}`)
    })

  }
  delectCodeLab(codeLabId:string):boolean{
    if(codeLabId){
      this.graphQl.deleteCodelab(codeLabId).subscribe(({data})=>{
          alert(`successfully delted...${JSON.stringify(data)}`);
          this.getuserCodeLab();
          this.codeLabForm.reset();
      },(err)=>{
          alert(`Error Received${err}`)
      })
    }
    return true;
  }
  showToastHandler(){
    this.toastHandler.set(true);
    setTimeout(()=>{
      this.toastHandler.set(false)
    },2000);
  }
  getPaginationData(event:{limit:number,page:number}){
    console.log("event emitted...",event);
    this.getuserCodeLab(event?.limit,event?.page);
  }
}
