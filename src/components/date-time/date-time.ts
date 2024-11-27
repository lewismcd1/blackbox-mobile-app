import { Component } from '@angular/core';

@Component({
  selector: 'date-time',
  templateUrl: 'date-time.html'
})
export class DateTimeComponent {

  time: string;

  constructor() {
    this.time = new Date().toLocaleString();
    setInterval(() => {
      this.time = new Date().toLocaleString();
    }, 1000)
  }

}
