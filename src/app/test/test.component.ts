import { Component, OnInit } from '@angular/core';
import {IonButton, IonContent, IonInput, IonItem, IonLabel, IonList} from "@ionic/angular/standalone";
import {ApiService} from "../services/api.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  imports: [
    IonContent,
    IonList,
    IonButton,
    IonItem
  ],
  standalone: true
})
export class TestComponent  implements OnInit {


  constructor(public api: ApiService) { }

  ngOnInit() {}

  fetchMealData() {
    this.api.getMeal().subscribe(result => {
      console.log(result);
    })
  }

  fetchFoodData() {
    this.api.getFood().subscribe(data => {
      console.log('Food Data:', data);
    });
  }
fetchCalories() {
  this.api.getCalories('4820179253313').subscribe(calories => {
    console.log('Kalorien:', calories);
  });
}
}
