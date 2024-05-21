import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto'; // Adjusted import statement

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef; // Marked as optional using definite assignment assertion operator
  isCelsius = true;
  chart: any;

  constructor() {}

  ngOnInit() {
    this.switchTemperature(null);
  }

  ngAfterViewInit() {
    this.initChart();
  }

  switchTemperature(event?: any) {
    this.isCelsius = event?.detail.value === 'celcius';
    this.updateChart(); // Update chart when temperature unit changes
  }

  initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1 PM', '2 PM', '3 PM', '4 PM', '5 PM'], // Sample hour labels
        datasets: [{
          label: 'Temperature',
          data: [20, 21, 22, 23, 24], // Sample temperature data
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  updateChart() {
    // You can update chart data here based on Celsius or Fahrenheit
    // For simplicity, let's assume data remains the same
    this.chart.update();
  }
}
