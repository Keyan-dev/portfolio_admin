import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_USERS_QUERY, GET_USER_CODE_LAB_QUERY } from './queries';
import { CodeLab } from '../models';
import { CREATE_CODE_LAB_MUTATION, DELETE_CODE_LAB_MUTATION } from './mutations';

@Injectable()
export class GraphqlService {
  constructor(private readonly apollo:Apollo,) {}
  //Function used to get all user details
  getAllUserDetails(){
    return this.apollo.watchQuery({query:GET_ALL_USERS_QUERY});
  }
  //Function used to get single user code lab
  getUserCodeLab(userId:string,pageData?:{limit:number,page:number}){
    console.log("function called...this.getUserCodeLab");
    return this.apollo.watchQuery({query:GET_USER_CODE_LAB_QUERY,variables:{userId,...pageData},fetchPolicy: 'network-only'});
  }
  //Function used to create a new code lab
  createCodeLab(codeLabForm:CodeLab){
    return this.apollo.mutate({mutation:CREATE_CODE_LAB_MUTATION,variables:{codeLab:codeLabForm}});
  }
  //Function used to delete code lab details
  deleteCodelab(codeLabId:string){
    return this.apollo.mutate({mutation:DELETE_CODE_LAB_MUTATION,variables:{deleteCodeLabId:codeLabId}});
  }
}
