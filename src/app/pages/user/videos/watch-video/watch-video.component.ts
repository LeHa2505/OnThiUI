import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/service/user-service/user.service';
import {
  format,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
  formatDistanceToNow,
} from 'date-fns';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.less'],
})
export class WatchVideoComponent implements OnInit {
  idShort: any;
  short: any;
  data: any[] = [];

  submitting = false;
  user = {
    author: 'Hà Trang',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1993/1993167.png',
  };
  inputValue = '';

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.idShort = this.userService.idShort;
    if (!this.idShort) {
      this.idShort = Number(localStorage.getItem('idShort'));
    }
    this.getDetailShortAPI();
  }

  getDetailShortAPI() {
    this.userService.getDetailShort(this.idShort).subscribe((res) => {
      if (res.success) {
        this.short = res.data;
      }
    });
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      const newData = [
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date(), { locale: vi }),
        },
        ...this.data,
      ];
      this.data = newData.map((e) => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime, { locale: vi }),
      }));
    }, 800);
  }

  convertTime(timeString: string): string {
    const date = parseISO(timeString);
    const now = new Date();

    const weeksDifference = differenceInWeeks(now, date);

    if (weeksDifference > 7) {
      return format(date, 'dd/MM/yyyy');
    } else {
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    }
  }
}
