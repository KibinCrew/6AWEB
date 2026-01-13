import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, I18nPluralPipe, JsonPipe, KeyValuePipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-pipes-demo',
  imports: [DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, SlicePipe, DecimalPipe, AsyncPipe, TitleCasePipe, JsonPipe, PercentPipe],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css',
})
export class PipesDemo {
  presentDate = new Date();
  price : number = 20000;
  Fruits = ['Apple', 'Orange', 'Grapes', 'Mango', 'Kiwi', 'Pomogranate'];
  time$ = interval(1000)
  .pipe(map(val => new Date()));
  decimalNum1: number = 8.7124315;
  decimalNum2: number = 5.34;
  title = 'Midterm Lab Actvity - Reactive Programming | Kevin Galang';
  json = {
    id: 1283946,
    name: 'PC Unit',
    details: {
      Unit: "ASUS ROG"
    }
  }
  currentUsage: number  = 12.0;
}

