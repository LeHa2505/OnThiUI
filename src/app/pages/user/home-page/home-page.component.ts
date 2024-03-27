import { Component, OnInit, ViewChild } from '@angular/core';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
})
export class HomePageComponent implements OnInit {
  selectedDate: any;
  public locale = 'VI';

  schedules = [
    {
      time: '5pm',
      subject: 'Tiếng Anh',
      lessonName: 'Unit 1: Local environment',
    },
    {
      time: '7h30',
      subject: 'Toán Học',
      lessonName: 'Bài 4: Căn bậc 2',
    },
    {
      time: '9h',
      subject: 'Vật lí',
      lessonName: 'Bài 2: Định luật Ôm',
    },
    {
      time: '9h30',
      subject: 'Toán Học',
      lessonName: 'Bài 4: Căn bậc 2',
    },
  ];

  toDoList = [
    {
      name: 'Làm bài tập Unit 1',
      deadline: '15h',
    },
    {
      name: 'Làm bài tập toán',
      deadline: '23h59',
    },
  ];

  ngOnInit() {
    this.selectedDate = new Date();
  }

  onListDayChange() {
    this.selectedDate =  this.fomatDate(new Date(this.selectedDate));
  }

  fomatDate(input: Date) {
    return format(input, "EEEE, 'ngày' dd 'tháng' MM 'năm' yyyy",  { locale: viLocale });
  }
}
