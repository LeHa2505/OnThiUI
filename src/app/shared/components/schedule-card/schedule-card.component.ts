import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.less']
})
export class ScheduleCardComponent {
  @Input() time: any;
  @Input() subject: any;
  @Input() lessonName: any

  colorsArray: string[] = ["#A4DDDE", "#F9EAA0", "#C6DDF7", "#eac4d5", "#e8dff5", "#ddedea"];

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorsArray.length);
    return this.colorsArray[randomIndex];
  }

}
