import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberGeneratorService {
 @Input() max: number = 10;
 @Input() Min: number = 1;
  constructor() { }

  getRandomNumber(max: number,min: number) {
  return Math.floor(Math.random() * (max- min) +min);
  }
}
