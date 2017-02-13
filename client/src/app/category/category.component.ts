import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  isRequired = false;
  isDisabled = false;
  showSelect = false;
  currentDrink: string;
  foodControl = new FormControl('pizza-1');

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  drinks = [
    {id: 'coke-0', name: 'Coke'},
    {id: 'sprite-1', name: 'Sprite'},
    {id: 'water-2', name: 'Water'},
    {id: 'pepper-3', name: 'Dr. Pepper'},
    {id: 'coffee-4', name: 'Coffee'},
    {id: 'tea-5', name: 'Tea'},
    {id: 'juice-6', name: 'Orange juice'},
    {id: 'wine-7', name: 'Wine'},
    {id: 'milk-8', name: 'Milk'},
  ];

  toggleDisabled() {
    this.foodControl.enabled ? this.foodControl.disable() : this.foodControl.enable();
  }

  constructor() { }

  ngOnInit() {

    this.currentDrink='tea-5';
  }

}
