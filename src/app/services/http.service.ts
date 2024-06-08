import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  /*
  * Function which is used to get method
  */
  get<T>(apiUrl: string, params: any, queryParams: any,): Observable<T> {
    apiUrl = this.replaceQueryandParams(environment.apiKey + apiUrl, params, queryParams);
    return this.http.get<T>(apiUrl);
  }
  /*
  Function which is used to post method 
  */
  post<T>(apiUrl: string, params: any, bodyData: any): Observable<T> {
    apiUrl = this.replaceQueryandParams(apiUrl, params, {});
    return this.http.post<T>(environment.apiKey + apiUrl, bodyData);
  }
  /*
  Function which is used to put method 
  */
  put<T>(apiUrl: string, params: any, bodyData: any): Observable<T> {
    apiUrl = this.replaceQueryandParams(environment.apiKey + apiUrl, params, {});
    return this.http.put<T>(apiUrl, bodyData);
  }
  /*
  Function which is used to delete method 
  */
  delete<T>(apiUrl: string, params: any, queryParams: any,): Observable<T> {
    apiUrl = this.replaceQueryandParams(environment.apiKey + apiUrl, params, queryParams);
    return this.http.delete<T>(apiUrl)
  }
  /*
  Function which is used to replace params and query content
  */
  replaceQueryandParams(url: string, params: object, queryParams: object): string {
    if (params && Object.keys(params)?.length) {
      for (let paramKey of Object.keys(params)) { url = url.replace(`{${paramKey}}`, (params as any)[paramKey]); }
    }
    if (queryParams && Object.keys(queryParams)?.length) {
      let httpParams = new HttpParams();
      Object.keys(queryParams).forEach(queryKey => { httpParams = httpParams.append(queryKey, (queryParams as any)[queryKey]); });
      url = `${url}?${httpParams}`;
    }
    return url;
  }
}
