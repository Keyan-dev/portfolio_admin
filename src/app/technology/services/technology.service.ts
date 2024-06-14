import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/Api/api-urls';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  constructor(private httpService: HttpService) {
  }
  //Function used to get all the Technologies
  getAllTechnologies(data: any): any {
    return this.httpService.get(ApiUrl.TECHNOLOGY, data.params, data.queryParams);
  }
  //Function used to create new Technology
  createTechnology(data: any): any {
    return this.httpService.post(ApiUrl.TECHNOLOGY, data?.params, data?.bodyData);
  }
  //Function used to update Technology
  updateTechnology(data: any): any {
    return this.httpService.put(ApiUrl.TECHNOLOGY, data?.params, data?.bodyData);
  }
  //Function used to delete Technology
  deleteTechnology(data: any): any {
    return this.httpService.delete(ApiUrl.TECHNOLOGY, data?.params, data?.queryParams);
  }
}
