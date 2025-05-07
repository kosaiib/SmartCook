import { Component } from '@angular/core';
import { NutritionService } from '../services/nutrition.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader
  ]
})
export class Tab2Page {
  ingredients = [{ name: '', amount: null }];
  nutritionalData: { name: string; value: number; unit: string }[] = [];

  constructor(private nutritionService: NutritionService) {}

  addIngredient() {
    this.ingredients.push({ name: '', amount: null });
  }

  onSubmit() {
    const foodNames = this.ingredients.map(ingredient => ingredient.name);
    this.getNutritionalValues(foodNames);
  }

  getNutritionalValues(foodNames: string[]) {
    this.nutritionalData = [];

    foodNames.forEach((food, index) => {
      const amount = this.ingredients[index].amount || 100;

      this.nutritionService.searchFood(food).subscribe(response => {
        if (response.foods && response.foods.length > 0) {
          const foodItem = response.foods[0];
          const nutrients = foodItem.foodNutrients || [];

          const filtered = nutrients.filter((n: { nutrientName: string; }) =>
            ['Energy', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference'].includes(n.nutrientName)
          );

          filtered.forEach((nutrient: { nutrientName: any; value: number; unitName: any; }) => {
            this.nutritionalData.push({
              name: `${food} – ${nutrient.nutrientName}`,
              value: (nutrient.value * amount) / 100,  // Menge in g
              unit: nutrient.unitName
            });
          });
        }
      });
    });
  }
}
