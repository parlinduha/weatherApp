import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrls: ['./uv-index.component.scss'],
})
export class UvIndexComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.updateUVDisplay(9); // Ganti dengan nilai UV Index yang sesuai
  }

  updateUVDisplay(index: number) {
    const uvIndicator = document.getElementById('uv-indicator');
    const uvValueElement = document.getElementById('uv-value');
    const uvLabelElement = document.getElementById('uv-label');
    const uvCanvas = document.getElementById('uv-canvas') as HTMLCanvasElement;

    let label = '';
    let color = '';

    if (index >= 1 && index <= 2) {
      label = 'Low';
      color = '#a2bc3a';
    } else if (index >= 3 && index <= 5) {
      label = 'Medium';
      color = '#eaca1b';
    } else if (index >= 6 && index <= 7) {
      label = 'High';
      color = '#f3992d';
    } else if (index >= 8 && index <= 10) {
      label = 'Very High';
      color = '#eb433a';
    } else if (index >= 11) {
      label = 'Extreme';
      color = '#a55ed4';
    }

    if (uvValueElement) {
      uvValueElement.textContent = index.toString();
    }
    if (uvLabelElement) {
      uvLabelElement.textContent = `${label}`;
    }
    if (uvIndicator) {
      uvIndicator.style.backgroundColor = color;
    }
    if (uvCanvas) {
      uvCanvas.style.borderColor = color;
    }

    // Tidak perlu menggambar pada canvas jika hanya mengubah border
  }
}
