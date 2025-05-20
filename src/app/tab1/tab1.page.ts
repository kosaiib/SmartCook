import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Vorschlag {
  name: string;
  type: 'zutat' | 'rezept';
}

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
  suchbegriff: string = '';
  vorschlaege: Vorschlag[] = [];

  constructor(
    private mealService: MealService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mealService.getAllIngredients().subscribe(data => {
      this.zutatenListe = data;
    });
  }

  suche(event: any) {
    const eingabe: string = event.target.value?.toLowerCase().trim();
    this.vorschlaege = [];

    if (!eingabe) return;

    const zutatenTreffer: Vorschlag[] = this.zutatenListe
      .filter(z => z.toLowerCase().includes(eingabe))
      .map((name: string) => ({ name, type: 'zutat' }));

    this.mealService.searchByName(eingabe).subscribe(res => {
      const rezeptTreffer: Vorschlag[] = res?.meals?.map((r: any) => r.strMeal)
        .filter((name: string) => name.toLowerCase().includes(eingabe))
        .map((name: string) => ({ name, type: 'rezept' })) || [];

      const kombiniert = [...zutatenTreffer, ...rezeptTreffer];

      this.vorschlaege = kombiniert.filter(
        (v, i, self) => self.findIndex(x => x.name === v.name && x.type === v.type) === i
      );
    });
  }

  vorschlagAuswaehlen(v: Vorschlag) {
    if (v.type === 'zutat') {
      const bereitsHinzugefuegt = this.ausgewaehlteZutaten
        .map(z => z.toLowerCase())
        .includes(v.name.toLowerCase());

      if (!bereitsHinzugefuegt) {
        this.ausgewaehlteZutaten.push(v.name);
        this.suchbegriff = '';
        this.vorschlaege = [];
      }
    } else {
      this.mealService.searchByName(v.name).subscribe(data => {
        this.rezepte = data?.meals || [];
        this.suchbegriff = '';
        this.vorschlaege = [];
      });
    }
  }

  zutatEntfernen(index: number) {
    this.ausgewaehlteZutaten.splice(index, 1);
    if (this.ausgewaehlteZutaten.length === 0) {
      this.rezepte = [];
    }
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
