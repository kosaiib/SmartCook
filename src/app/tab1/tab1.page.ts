import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class Tab1Page implements OnInit {
  zutatenListe: string[] = [];
  ausgewaehlteZutaten: string[] = [];
  rezepte: any[] = [];
  neueZutat: string = '';

  constructor(
    private mealService: MealService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mealService.getAllIngredients().subscribe(data => {
      this.zutatenListe = data;
    });
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
    if (this.ausgewaehlteZutaten.length > 0) {
      this.mealService
        .searchByMultipleIngredients(this.ausgewaehlteZutaten)
        .subscribe(data => {
          this.rezepte = data;
        });
    }
  }

  zeigeDetails(id: string) {
    this.router.navigate(['/rezept-details', id]);
  }
}
