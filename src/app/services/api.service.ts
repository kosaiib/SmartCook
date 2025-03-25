import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly mealApiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
  readonly foodApiUrl = 'https://world.openfoodfacts.org/api/v2/product/737628064502.json';

  constructor(public http: HttpClient) { }

  getMeal(): Observable<any> {
    return this.http.get(this.mealApiUrl);
  }

  getFood(): Observable<any> {
    return this.http.get(this.foodApiUrl);
  }
  getCalories(barcode: string): Observable<number | string> {
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
    return this.http.get<any>(url).pipe(
      map(response => response?.product?.nutriments?.['energy-kcal_100g'] ?? 'Keine Kalorien gefunden'),
      catchError(() => of('Fehler beim Abrufen der Daten'))
    );
  }
}
