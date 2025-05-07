import { Component, OnInit } from '@angular/core';
import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader
  ]
})
export class Tab3Page {

  favorites: any[] = [];

  constructor() {}

  ngOnInit() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }



}
