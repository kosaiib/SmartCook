import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, switchMap, Observable } from 'rxjs';

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
    const ingredientRequests = ingredients.map(i => this.searchByIngredient(i));

    return forkJoin(ingredientRequests).pipe(
      map(results => {
        const allMeals = results.flat();
        const uniqueMealIds = [...new Set(allMeals.map(meal => meal.idMeal))];
        return uniqueMealIds;
      }),
      switchMap(ids => {
        const detailRequests = ids.map(id => this.getMealDetails(id));
        return forkJoin(detailRequests);
      })
    );
  }

  searchByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${name}`);
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<any>(`${this.apiUrl}/categories.php`)
      .pipe(map(res => res.categories.map((c: any) => c.strCategory)));
  }

  getMealsByCategory(category: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/filter.php?c=${category}`)
      .pipe(map(res => res.meals || []));
  }
}
