import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {TestComponent} from "../test/test.component";
import {MealService} from "../services/meal.service";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ ExploreContainerComponent, TestComponent,  FormsModule,CommonModule, IonicModule,],
})
export class Tab1Page {

  zutatenListe: string[] = [];
  ausgewaehlteZutaten: string[] = [];
  rezepte: any[] = [];
  neueZutat: string = '';
  favorites: any[] = [];

  constructor(private mealService: MealService) {}

   ngOnInit() {
     this.mealService.getAllIngredients().subscribe(data => {
       this.zutatenListe = data;
     });
      this.loadFavorites();
   }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  addToFavorites(rezept: any) {
    if (!this.favorites.some((fav) => fav.idMeal === rezept.idMeal)) {
      this.favorites.push(rezept);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }


  removeFromFavorites(rezept: any) {
    this.favorites = this.favorites.filter((fav) => fav.idMeal !== rezept.idMeal);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }


  zutatHinzufuegen() {
    if (
      this.neueZutat.trim() &&
      !this.ausgewaehlteZutaten.includes(this.neueZutat)
    ) {
      this.ausgewaehlteZutaten.push(this.neueZutat);
      this.neueZutat = '';
    }
  }

  zutatEntfernen(index: number) {
    this.ausgewaehlteZutaten.splice(index, 1);
  }

  rezepteSuchen() {
    this.mealService
      .searchByMultipleIngredients(this.ausgewaehlteZutaten)
      .subscribe(data => {
        this.rezepte = data;
      });
  }

}

