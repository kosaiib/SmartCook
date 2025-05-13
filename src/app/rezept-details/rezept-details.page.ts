import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../services/meal.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-rezept-details',
  templateUrl: './rezept-details.page.html',
  styleUrls: ['./rezept-details.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule
  ]
})
export class RezeptDetailsPage implements OnInit {
  rezept: any = null;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Rezept ID:', id);
    if (id) {
      this.mealService.getMealDetails(id).subscribe((data) => {
        console.log('Rezept Daten:', data);
        this.rezept = data;
      });
    }
  }

  getZutatenListe(): string[] {
    if (!this.rezept) return [];
    const zutaten: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const zutat = this.rezept[`strIngredient${i}`];
      const menge = this.rezept[`strMeasure${i}`];
      if (zutat && zutat.trim()) {
        zutaten.push(`${menge || ''} ${zutat}`.trim());
      }
    }
    return zutaten;
  }
}
