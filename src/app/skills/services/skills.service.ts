import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/Api/api-urls';
import { HttpService } from 'src/app/services/http.service';
@Injectable({
    providedIn: 'root'
})
export class SkillsService {
    constructor(private httpService: HttpService) { }
    //Function used to get all the skillGroups
    getAllSkillGroups(data: any): any {
        return this.httpService.get(ApiUrl.SKILL_GROUP, data.params, data.queryParams);
    }
    //Function used to create new skillGroup
    createSkillGroup(data: any): any {
        return this.httpService.post(ApiUrl.SKILL_GROUP, data?.params, data?.bodyData);
    }
    //Function used to update skillGroup
    updateSkillGroup(data: any): any {
        return this.httpService.put(ApiUrl.SKILL_GROUP, data?.params, data?.bodyData);
    }
    //Function used to delete skillGroup
    deleteSkillGroup(data: any): any {
        return this.httpService.delete(ApiUrl.SKILL_GROUP, data?.params, data?.queryParams);
    }
}
