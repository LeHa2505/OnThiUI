import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
})
export class HomePageComponent implements OnInit {
  selectedDate: any;
  public locale = 'VI';
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
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

  shorts: any;

  livestreams = [
    {
      user: 'https://img.freepik.com/free-photo/portrait-young-male-professor-education-day_23-2150980067.jpg',
      link: 'https://i.pinimg.com/564x/d5/e9/36/d5e93629ba41d22e34285c22e42f123f.jpg',
    },
    {
      user: 'https://static.vecteezy.com/system/resources/previews/010/871/113/original/3d-avatar-teacher-png.png',
      link: 'https://i.pinimg.com/564x/42/2f/c7/422fc7525fccc1a378826703abce4c3d.jpg',
    },
    {
      user: 'https://t4.ftcdn.net/jpg/07/06/11/27/360_F_706112771_kXxl6umxCpyNVB0AHNqyVuh5BhYj0XIx.jpg',
      link: 'https://i.pinimg.com/564x/aa/45/1a/aa451a121b0302a3cc1b4ab7e3569658.jpg',
    },
    {
      user: 'https://t3.ftcdn.net/jpg/06/51/81/76/360_F_651817669_26Rq5TaHWp0B8s7V6rbwe4V0OD0fnErM.jpg',
      link: 'https://i.pinimg.com/564x/39/69/31/396931a131675f7b0ab0732d100bd2f1.jpg',
    },
    {
      user: 'https://t3.ftcdn.net/jpg/06/36/87/68/360_F_636876853_ysqWTBBmPK7zS3j4xdSCNMIftig9Fj2a.jpg',
      link: 'https://i.pinimg.com/564x/62/2c/40/622c40a91efd1fa55e1a2a503caae3ce.jpg',
    },
  ];

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit() {
    this.selectedDate = new Date();
    this.getShortsAPI();
  }

  getShortsAPI() {
    this.userService.userGetShortsById(this.idUser).subscribe((res) => {
      if (res.success) {
        this.shorts = res.data;
      }
    });
  }

  onListDayChange() {
    this.selectedDate = this.fomatDate(new Date(this.selectedDate));
  }

  fomatDate(input: Date) {
    return format(input, "EEEE, 'ngày' dd 'tháng' MM 'năm' yyyy", {
      locale: viLocale,
    });
  }

  detailShort(item: any) {
    const idShort = Number(item.ID_SHORT);
    this.userService.idShort = idShort;
    localStorage.setItem('idShort', idShort.toString());
    this.router.navigateByUrl('/shorts/detail');
  }
}
