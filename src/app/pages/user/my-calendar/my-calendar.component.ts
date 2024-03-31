import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.less'],
})
export class MyCalendarComponent implements OnInit {
  selectedDate: any;
  public locale = 'VI';
  today: Date = new Date();

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

  listOfData = [
    {
      id: '1',
      isDone: false,
      name: 'Làm bài tập Unit 1',
      subject: 'Tiếng Anh',
      deadline: `${this.today.toLocaleDateString()} : 15h`,
      description: 'Chưa biết mô tả gì',
      status: 0,
    },
    {
      id: '2',
      isDone: false,
      name: 'Làm bài tập toán',
      subject: 'Toán',
      deadline: `${this.today.toLocaleDateString()} : 23h59`,
      description: 'Chưa biết mô tả gì',
      status: 1,
    },
    {
      id: '3',
      isDone: true,
      name: 'Làm bài tập toán',
      subject: 'Toán',
      deadline: `${this.today.toLocaleDateString()} : 23h59`,
      description: 'Chưa biết mô tả gì',
      status: 2,
    },
  ];

  colorsArray: string[] = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

  checked = false;

  isVisible = false;
  deleteTaskId: any;

  editCache: { [key: string]: { edit: boolean; data: any } } = {};

  @ViewChild('template', { static: true }) template!: TemplateRef<any>;

  constructor(private notification: NzNotificationService) {}

  showModal(id: any): void {
    this.deleteTaskId = id;
    this.isVisible = true;
  }

  handleOk(): void {
    this.listOfData = this.listOfData.filter(item => item.id !== this.deleteTaskId);
    this.createBasicNotification(this.template);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  ngOnInit() {
    this.selectedDate = new Date();
    this.updateEditCache();
  }
  onListDayChange() {
    this.selectedDate = this.fomatDate(new Date(this.selectedDate));
  }

  fomatDate(input: Date) {
    return format(input, "EEEE, 'ngày' dd 'tháng' MM 'năm' yyyy", {
      locale: viLocale,
    });
  }

  getColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorsArray.length);
    return this.colorsArray[randomIndex];
  }

  onclickDelete(id: any) {}
}
