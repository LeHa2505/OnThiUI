import {Component, Input} from '@angular/core';
import { colorsArray } from 'src/constants';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.less']
})
export class ScheduleCardComponent {
  @Input() time: any;
  @Input() subject: any;
  @Input() lessonName: any

  colorsArray = colorsArray;

  ngOnInit(): void {
    this.getRandomColor();
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorsArray.length);
    return this.colorsArray[randomIndex];
  }

}
