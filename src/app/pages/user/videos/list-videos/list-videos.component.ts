import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.less'],
})
export class ListVideosComponent {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  shorts: any;

  constructor(private userService: UserService, public router: Router,
  ) {}

  ngOnInit() {
    this.getShortsAPI();
  }

  getShortsAPI() {
    this.userService.userGetShortsById(this.idUser).subscribe((res) => {
      if (res.success) {
        this.shorts = res.data;
      }
    });
  }

  detailShort(item: any) {
    const idShort = Number(item.ID_SHORT);
    this.userService.idShort = idShort;
    localStorage.setItem('idShort', idShort.toString());
    this.router.navigateByUrl('/shorts/detail');
  }
}
