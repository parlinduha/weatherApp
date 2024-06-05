import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrls: ['./uv-index.component.scss'],
})
export class UvIndexComponent implements OnInit {
  dataValue = 10; // Replace with actual UV index data
  maxValue = 10; // Maximum possible UV index
  minRotation = 40; // Minimum rotation angle (in degrees)
  maxRotation = 213; // Maximum rotation angle (in degrees)

  constructor() {}

  ngOnInit() {}

  getGaugeTransform(): string {
    const clampedPercentage = Math.min(
      Math.max(this.dataValue / this.maxValue, 0),
      1
    ); // Clamp percentage to 0-1
    const degrees =
      clampedPercentage * (this.maxRotation - this.minRotation) +
      this.minRotation;
    return `rotate(${degrees}deg)`;
  }
}
