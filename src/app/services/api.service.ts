import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly mealApiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';


  constructor(public http: HttpClient) { }

  getMeal(): Observable<any> {
    return this.http.get(this.mealApiUrl);
  }


}
