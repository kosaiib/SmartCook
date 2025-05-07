// nutrition.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  private apiUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=Apple&api_key=bUxZdJGfN5iU0Mj4u4IbVotCgfTMTvktNgi9IuaZ';
  private apiKey = 'bUxZdJGfN5iU0Mj4u4IbVotCgfTMTvktNgi9IuaZ';  // Hier den tatsächlichen API-Schlüssel einfügen.

  constructor(private http: HttpClient) { }

  searchFood(query: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {
      query: query,
      apiKey: this.apiKey
    };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
