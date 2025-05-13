import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<string[]> {
    return this.http
      .get<any>(`${this.apiUrl}/list.php?i=list`)
      .pipe(map(res => res.meals.map((m: any) => m.strIngredient)));
  }

  searchByIngredient(ingredient: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/filter.php?i=${ingredient}`)
      .pipe(map(res => res.meals || []));
  }

  getMealDetails(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/lookup.php?i=${id}`)
      .pipe(map(res => res.meals[0]));
  }

  searchByMultipleIngredients(ingredients: string[]): Observable<any[]> {
    const requests = ingredients.map(i => this.searchByIngredient(i));
    return forkJoin(requests).pipe(
      map(results => {
        const allMeals = results.reduce((acc, val) => acc.concat(val), []);
        const uniqueMeals = new Map();
        for (let meal of allMeals) {
          uniqueMeals.set(meal.idMeal, meal);
        }
        return Array.from(uniqueMeals.values());
      })
    );
  }
}
