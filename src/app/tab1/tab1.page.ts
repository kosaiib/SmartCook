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
  zutatenListe: string[] = [];                  // Liste aller verfügbaren Zutaten
  ausgewaehlteZutaten: string[] = [];          // Liste der ausgewählten Zutaten
  rezepte: any[] = [];                         // Die Rezepte, die durch die Suche zurückgegeben werden
  neueZutat: string = '';                      // Die neue Zutat, die der Liste hinzugefügt werden soll

  constructor(
    private mealService: MealService,           // MealService, um Rezepte und Zutaten von der API zu holen
    private router: Router                      // Router, um auf die Rezept-Detailseite zu navigieren
  ) {}

  ngOnInit() {
    // Lade alle Zutaten, wenn die Seite initialisiert wird
    this.mealService.getAllIngredients().subscribe(data => {
      this.zutatenListe = data;
    });
  }

  // Methode, um eine Zutat zur Liste der ausgewählten Zutaten hinzuzufügen
  zutatHinzufuegen() {
    if (
      this.neueZutat.trim() &&             // Wenn die Zutat nicht leer ist
      !this.ausgewaehlteZutaten.includes(this.neueZutat)  // Wenn die Zutat noch nicht in der Liste ist
    ) {
      this.ausgewaehlteZutaten.push(this.neueZutat);  // Zutat zur Liste hinzufügen
      this.neueZutat = '';  // Eingabefeld zurücksetzen
    }
  }

  // Methode, um eine Zutat aus der Liste der ausgewählten Zutaten zu entfernen
  zutatEntfernen(index: number) {
    this.ausgewaehlteZutaten.splice(index, 1);  // Entferne die Zutat mit dem gegebenen Index
  }

  // Methode, um Rezepte basierend auf den ausgewählten Zutaten zu suchen
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
