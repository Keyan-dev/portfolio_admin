import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Apollo} from 'apollo-angular';
import {ApolloQueryResult, gql} from '@apollo/client/core';
import {NgOptimizedImage} from '@angular/common';
interface userDetails {
  name: string;
  id: string;
  email: string;
}
interface userApiResponse{
  data:{
    users:userDetails[]
  }
}
interface codeLabDetails{
  name: string;
  id: string;
  description: string;
  imageUrl: string;
  liveUrl:string
}
@Component({
  selector: 'app-codelab',
  imports: [FormsModule,ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelect, MatOption, MatButton, MatIconButton, NgOptimizedImage],
  templateUrl: './codelab.component.html',
  styleUrl: './codelab.component.scss',
})
export class CodelabComponent implements OnInit {
    userId:string|null = null;
    codeLabs=signal<codeLabDetails[]>([])
    codeLabForm:FormGroup;
    users=signal<userDetails[] | null>([]);
    constructor(
      private readonly apollo:Apollo,
      formBuilder: FormBuilder
    ) {
      this.codeLabForm = formBuilder.group({
        codeLabName: ['', Validators.required],
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
      this.apollo
      .watchQuery({
        query: gql`
          query Users {
            users {
              id
              name
              email
            }
          }
        `,
      })
      .valueChanges.subscribe((result:ApolloQueryResult<any>) => {
        console.log("result",result?.data?.users);
        this.users.set(result.data.users);
      });
    }
  getuserCodeLab(){
      console.log("onchange function called....");
      console.log("onchange function called....");
      this.apollo.watchQuery({
        query: gql`
          query Codelabs($userId: ID!) {
            user(id: $userId) {
              codelabs {
                name
                description
                id
                imageUrl
                liveUrl
              }
            }
          }`,
        variables:{
          userId: this.userId,
        }
      })
      .valueChanges.subscribe((result:ApolloQueryResult<any>) => {
        console.log("api called...result",result);
        this.codeLabs.set(result.data.user.codelabs);

      });
  }
    addCodeLab():void{
      console.log(this.codeLabForm.value)
    }
}
